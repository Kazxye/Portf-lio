'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Command } from 'cmdk'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { sections } from '@/content/navigation'
import { projects } from '@/content/projects'
import { profile } from '@/content/profile'

type CopyState = 'idle' | 'copied' | 'failed'

// Platform never changes during a session, so the store has nothing to subscribe to.
// The server snapshot assumes macOS; the client corrects it during hydration.
const subscribeNoop = () => () => {}
const isApplePlatform = () => /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
const isApplePlatformOnServer = () => true

function log(level: 'warn' | 'error', event: string, detail?: unknown) {
  console[level](
    JSON.stringify({
      component: 'command-menu',
      event,
      detail: String(detail ?? ''),
    }),
  )
}

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const isApple = useSyncExternalStore(
    subscribeNoop,
    isApplePlatform,
    isApplePlatformOnServer,
  )
  const router = useRouter()
  const pathname = usePathname()

  // What to run once the dialog has fully closed (scroll lock released).
  const inputRef = useRef<HTMLInputElement>(null)
  const pendingAction = useRef<(() => void) | null>(null)
  // Where focus was before opening, so it can be restored for any trigger,
  // including the keyboard shortcut.
  const returnFocusTo = useRef<HTMLElement | null>(null)

  function openMenu() {
    returnFocusTo.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    setCopyState('idle')
    setOpen(true)
  }

  function closeMenu() {
    setOpen(false)
    setCopyState('idle')
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== 'k' || !(event.metaKey || event.ctrlKey))
        return
      event.preventDefault()
      if (open) {
        closeMenu()
      } else {
        openMenu()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  function closeThen(action: () => void) {
    pendingAction.current = action
    closeMenu()
  }

  function goToSection(id: string) {
    if (pathname !== '/') {
      router.push(id === 'top' ? '/' : `/#${id}`)
      return
    }

    if (id === 'top') {
      window.scrollTo({ top: 0 })
      history.replaceState(null, '', '/')
      document.getElementById('main')?.focus({ preventScroll: true })
      return
    }

    const target = document.getElementById(id)
    if (!target) {
      log('warn', 'section_not_found', id)
      return
    }
    // Scroll behaviour comes from CSS, which already honours reduced motion.
    target.scrollIntoView({ block: 'start' })
    target.focus({ preventScroll: true })
    history.replaceState(null, '', `#${id}`)
  }

  function openExternal(url: string) {
    // Must run synchronously inside the select handler to count as a user gesture.
    window.open(url, '_blank', 'noopener,noreferrer')
    closeMenu()
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch (error) {
      // Clipboard API is missing on insecure origins and can be denied by policy.
      log('error', 'clipboard_write_failed', error)
      setCopyState('failed')
    }
  }

  const emailHint = {
    idle: profile.email,
    copied: 'Copied',
    failed: 'Copy failed, use Send email',
  }[copyState]

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => (next ? openMenu() : closeMenu())}
    >
      <button
        type="button"
        onClick={openMenu}
        className="cmd-trigger hidden md:inline-flex"
        aria-label="Open command menu"
      >
        <kbd className="font-mono">{isApple ? '⌘' : 'Ctrl'}</kbd>
        <kbd className="font-mono">K</kbd>
      </button>
      <button
        type="button"
        onClick={openMenu}
        className="cmd-trigger md:hidden"
        aria-label="Open navigation menu"
      >
        Menu
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="cmd-overlay" />
        <Dialog.Content
          className="cmd-panel"
          aria-describedby={undefined}
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            inputRef.current?.focus()
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            const action = pendingAction.current
            pendingAction.current = null
            if (action) {
              // Next frame: Radix has removed the scroll lock by then.
              requestAnimationFrame(action)
              return
            }
            returnFocusTo.current?.focus({ preventScroll: true })
          }}
        >
          <Dialog.Title className="sr-only">Command menu</Dialog.Title>
          <Dialog.Close className="cmd-close" aria-label="Close command menu">
            Esc
          </Dialog.Close>
          <Command label="Command menu" loop>
            <Command.Input
              ref={inputRef}
              placeholder="Type a command or search"
            />
            <Command.List>
              <Command.Empty>
                Nothing matches. Try “work” or “github”.
              </Command.Empty>

              <Command.Group heading="Navigate">
                <Command.Item
                  value="home"
                  keywords={['top', 'start']}
                  onSelect={() => closeThen(() => goToSection('top'))}
                >
                  Home
                </Command.Item>
                {sections.map((section) => (
                  <Command.Item
                    key={section.id}
                    value={section.title}
                    keywords={[...section.keywords]}
                    onSelect={() => closeThen(() => goToSection(section.id))}
                  >
                    {section.title}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Case studies">
                {projects.map((project) => (
                  <Command.Item
                    key={project.slug}
                    value={project.name}
                    keywords={[project.category, project.domain]}
                    onSelect={() =>
                      closeThen(() => router.push(`/projects/${project.slug}`))
                    }
                  >
                    {project.name}
                    <span className="cmd-hint">{project.category}</span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Links">
                <Command.Item
                  value="github"
                  keywords={['code', 'repositories', 'source']}
                  onSelect={() => openExternal(profile.links.github)}
                >
                  GitHub
                  <span className="cmd-hint">github.com/Kazxye</span>
                </Command.Item>
                <Command.Item
                  value="linkedin"
                  keywords={['profile', 'career']}
                  onSelect={() => openExternal(profile.links.linkedin)}
                >
                  LinkedIn
                  <span className="cmd-hint">in/kazystatarunas</span>
                </Command.Item>
                <Command.Item
                  value="resume"
                  keywords={['cv', 'pdf', 'curriculum']}
                  onSelect={() => openExternal(profile.links.resume)}
                >
                  Resume
                  <span className="cmd-hint">PDF</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Email">
                <Command.Item
                  value="copy email address"
                  keywords={['contact', 'mail']}
                  onSelect={copyEmail}
                >
                  Copy email address
                  <span
                    className="cmd-hint"
                    data-state={copyState}
                    aria-live="polite"
                  >
                    {emailHint}
                  </span>
                </Command.Item>
                <Command.Item
                  value="send email"
                  keywords={['contact', 'mail', 'write']}
                  onSelect={() =>
                    closeThen(() =>
                      window.location.assign(`mailto:${profile.email}`),
                    )
                  }
                >
                  Send email
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
          <p
            aria-hidden="true"
            className="hidden border-t border-line px-4 py-2.5 font-mono text-[0.6875rem] text-fg-3 md:block"
          >
            ↑↓ to move, ↵ to select, esc to close
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
