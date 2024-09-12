import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import * as Framer from 'framer'

const routes = {
  yd7nMFDHh: {
    elements: {
      DXh1aHQJN: 'about',
      eQoGsr6rK: 'service-1',
      ffQKfJ0Kx: 'hero-heading-3',
      jGFDk87Dh: 'hero-heading',
      MERXQpASN: 'hero-heading-2',
      om1250aoL: 'about-1',
      oVhGXVifM: 'step',
      QeagwX1Rm: 'hero-heading-1',
      rZyCoDj_M: 'testimonial',
      UaACQKPhS: 'service',
      Usy9pnRtq: 'hero-heading-4',
      vTTUKTKEu: 'why-us'
    },
    page: Framer.lazy(() =>
      import(
        'https://framerusercontent.com/modules/zQsIqTDQ1ngj7c4iMhge/RHUkNxNlrm3Qvl3px8BS/yd7nMFDHh.js'
      )
    ),
    path: '/content/usercontent/yd7nMFDHh.js'
  },
  NWoNbHFlK: {
    elements: {
      D0_zL0l65: 'step-1',
      Ij5oQQjaA: '2',
      LFaeHhwLq: 'team',
      nRZ5qskaV: '4',
      RL5tQoCIA: 'step',
      w6E16qdLC: 'effect',
      W6RFvsPcN: 'hero-heading-tablet',
      WDnW_ExLi: '3',
      y_BmAL0cU: 'hero-heading',
      ZzbML8NQ4: '1'
    },
    page: Framer.lazy(() =>
      import(
        'https://framerusercontent.com/modules/1K83a9ePXLmhlemOExJv/YfAuyM0b5oqjbvD2EOjI/NWoNbHFlK.js'
      )
    ),
    path: '/content/usercontent/'
  },
  BadAnFeJz: {
    elements: {
      AI1LOyYRe: 'about-3',
      CTx1rPOx8: 'about-1',
      fSCxc1VdS: 'hero-heading-1',
      mzx0qWttd: 'about',
      rd37VUPip: 'about-2',
      TeyZ81bd8: 'hero-heading',
      tHEdaQXRd: 'pricing-1',
      tQiFfGktS: 'service-3'
    },
    page: Framer.lazy(() =>
      import(
        'https://framerusercontent.com/modules/x7fmMG9UsN38o49bs5hD/GsN5bbg23mQpwoN1VjXG/BadAnFeJz.js'
      )
    ),
    path: '/service'
  },
  A5wLTn1r_: {
    elements: { fbgaSOdSm: 'hero-heading', V90GvhJlh: 'hero-heading-1' },
    page: Framer.lazy(() =>
      import(
        'https://framerusercontent.com/modules/oc6MvQaKWgqCT3uoBA7f/CxOYm1bvYGtPznADwTZW/A5wLTn1r_.js'
      )
    ),
    path: '/404'
  },
  sHaTE1jEC: {
    elements: { NlPF9GoLT: 'hero-heading' },
    page: Framer.lazy(() =>
      import(
        'https://framerusercontent.com/modules/qUWlx4rwaM0pIGHUPHfi/4o8quUxyh6VVJfWaJvk1/sHaTE1jEC.js'
      )
    ),
    path: '/contact-us'
  }
}
const locales = [
  { code: 'en', id: 'default', name: 'English', slug: '' },
  { code: 'id', id: 'mihf6zLrf', name: 'Indonesian', slug: 'id' }
]

export async function getPageRoot ({ routeId, pathVariables, localeId }) {
  // We don't want the initial render to immediately have to suspend.
  await routes[routeId].page.preload()

  const content = React.createElement(Framer.PageRoot, {
    isWebsite: true,
    routeId,
    pathVariables,
    routes,
    collectionUtils: {},
    framerSiteId:
      '47acda924c6cbe4d89f3a472187b61e8e3050c1ed85f05a10c95ccf10da59ac2',
    notFoundPage: Framer.lazy(() =>
      import(
        'https://framerusercontent.com/modules/oc6MvQaKWgqCT3uoBA7f/CxOYm1bvYGtPznADwTZW/A5wLTn1r_.js'
      )
    ),
    isReducedMotion: undefined,
    localeId,
    locales,
    preserveQueryParams: false
  })

  const contentWithFeaturesContext = React.createElement(
    Framer.LibraryFeaturesProvider,
    {
      children: content,
      value: { enableAsyncURLUpdates: false, useGranularSuspense: false }
    }
  )

  const page = React.createElement(Framer.PageEffectsProvider, {
    children: contentWithFeaturesContext,
    value: { routes: {} }
  })

  return page
}

const isBrowser = typeof document !== 'undefined'
if (isBrowser) {
  window.__framer_importFromPackage =
    (packageAndFilename, exportIdentifier) => () => {
      return React.createElement(Framer.ErrorPlaceholder, {
        error:
          'Package component not supported: "' +
          exportIdentifier +
          '" in "' +
          packageAndFilename +
          '"'
      })
    }

  // A lot of libraries assume process.env.NODE_ENV is present in runtime/buildtime, so we are polyfilling it
  window.process = {
    ...window.process,
    env: {
      ...(window.process ? window.process.env : undefined),
      NODE_ENV: 'production'
    }
  }

  window.__framer_events = window.__framer_events || []

  // Fallback support for stack gaps
  Framer.installFlexboxGapWorkaroundIfNeeded()

  const container = document.getElementById('main')
  // We know that #main is parsed before this script, so we don't need to wait for DOMContentLoaded or similar events.
  if ('framerHydrateV2' in container.dataset) main(true, container)
  else main(false, container)
}

function track () {
  if (!isBrowser) return
  window.__framer_events.push(arguments)
}

async function main (shouldHydrate, container) {
  try {
    let routeId, localeId, pathVariables, breakpoints
    if (shouldHydrate) {
      const routeData = JSON.parse(container.dataset.framerHydrateV2)
      routeId = routeData.routeId
      localeId = routeData.localeId
      pathVariables = routeData.pathVariables
      breakpoints = routeData.breakpoints
    } else {
      const routeData = Framer.inferInitialRouteFromPath(
        routes,
        decodeURIComponent(location.pathname),
        true,
        locales
      )
      routeId = routeData.routeId
      localeId = routeData.localeId
      pathVariables = routeData.pathVariables
    }

    const page = await getPageRoot({ routeId, localeId, pathVariables })

    function handleRecoverableError (error, errorInfo) {
      const componentStack = errorInfo?.componentStack
      console.warn(
        'Recoverable error during hydration. Please check any custom code or code overrides to fix server/client mismatches.',
        error,
        componentStack
      )
      // we only want to collect 1%, because this can be quite noisy (floods the data pipeline)
      if (Math.random() > 0.01) return
      track('published_site_load_recoverable_error', {
        message: String(error),
        componentStack, // componentStack is more useful
        stack: componentStack
          ? undefined
          : error instanceof Error && typeof error.stack === 'string'
          ? error.stack
          : null
      })
    }

    if (shouldHydrate) {
      Framer.withPerformanceMarks('framer-rewrite-breakpoints', () => {
        Framer.removeHiddenBreakpointLayersV2(breakpoints)
        window.__framer_onRewriteBreakpoints?.(breakpoints)
      })

      React.startTransition(() => {
        Framer.markHydrationStart()
        Framer.setInitialHydrationState()
        if (true) Framer.turnOffReactEventHandling()
        ReactDOM.hydrateRoot(container, page, {
          onRecoverableError: handleRecoverableError
        })
      })
    } else {
      ReactDOM.createRoot(container, {
        onRecoverableError: handleRecoverableError
      }).render(page)
    }
  } catch (error) {
    track('published_site_load_error', {
      message: String(error),
      stack:
        error instanceof Error && typeof error.stack === 'string'
          ? error.stack
          : null
    })
    throw error
  }
}

;(function () {
  if (!isBrowser) return

  React.startTransition(() => {
    ReactDOM.createRoot(
      document.getElementById('__framer-badge-container')
    ).render(
      React.createElement(
        React.Suspense,
        {},
        React.createElement(
          Framer.withStyleAppearEffect(Framer.Container),
          {
            className: '__framer-badge',
            __framer__threshold: 0.5,
            __framer__animateOnce: true,
            __framer__opacity: 0,
            __framer__targetOpacity: 1,
            __framer__rotate: 0,
            __framer__x: 0,
            __framer__y: 10,
            __framer__scale: 1,
            __framer__transition: {
              type: 'spring',
              ease: [0.44, 0, 0.56, 1],
              duration: 0.3,
              delay: 1,
              stiffness: 350,
              damping: 40,
              mass: 1.5
            },
            __framer__rotateX: 0,
            __framer__rotateY: 0,
            __framer__perspective: 1200
          },
          React.createElement(React.lazy(() => import('__framer-badge')))
        )
      )
    )
  })
})()
