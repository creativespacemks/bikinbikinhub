import {
    I as b,
    J as _,
    K as s,
    L as v,
    M as E,
    N as k,
    Na as z,
    O as P,
    R as S,
    V as I,
    X as L,
    d as y,
    f as o,
    i as F,
    j as f,
    ka as x,
    oa as Q,
    za as V
} from './chunk-H53XXMKR.mjs'
import { c as r } from './chunk-ELYU6EKT.mjs'

var G = 'default' in _ ? b : _,
    d = {},
    M = G
d.createRoot = M.createRoot
d.hydrateRoot = M.hydrateRoot

var p = d.createRoot,
    N = d.hydrateRoot

var u = {
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
        page: s(() =>
            import('./xmzIErwrrl8YPNWiHHjIjpy6Rc6hlz797JmVY6zuzi0.ZLXQUFUY.mjs')
        ),
        path: '/'
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
        page: s(() =>
            import('./DafLTcswLzySMvn55BwTqBC_upguZ7llHFvUpY-DCXU.TEHXOPYC.mjs')
        ),
        path: '/about'
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
        page: s(() =>
            import('./Yeu_qT_-g6YFmm_6qEtLvKlkZ35JMspMafMNal5fpJk.CCCHSDLP.mjs')
        ),
        path: '/service'
    },
    A5wLTn1r_: {
        elements: { fbgaSOdSm: 'hero-heading', V90GvhJlh: 'hero-heading-1' },
        page: s(() =>
            import('./NWu6zsWEyqGSSMvGVHQqTXfL6aGYCHax2dRT8sp3-Ek.YM5F6KGD.mjs')
        ),
        path: '/404'
    },
    sHaTE1jEC: {
        elements: { NlPF9GoLT: 'hero-heading' },
        page: s(() =>
            import('./MTaKEgxYIMLueetzArC2qvadBpOUjUpfTTufo5X8HaE.4IKOOVZW.mjs')
        ),
        path: '/contact-us'
    }
},
    A = [
        { code: 'en', id: 'default', name: 'English', slug: '' },
        { code: 'id', id: 'mihf6zLrf', name: 'Indonesian', slug: 'id' }
    ]

async function B({ routeId: t, pathVariables: n, localeId: a }) {
    await u[t].page.preload()
    let i = o(Q, {
        isWebsite: !0,
        routeId: t,
        pathVariables: n,
        routes: u,
        collectionUtils: {},
        framerSiteId:
            '47acda924c6cbe4d89f3a472187b61e8e3050c1ed85f05a10c95ccf10da59ac2',
        notFoundPage: s(() =>
            import('./NWu6zsWEyqGSSMvGVHQqTXfL6aGYCHax2dRT8sp3-Ek.YM5F6KGD.mjs')
        ),
        isReducedMotion: void 0,
        localeId: a,
        locales: A,
        preserveQueryParams: !1
    }),
        c = o(x, {
            children: i,
            value: { enableAsyncURLUpdates: !1, useGranularSuspense: !1 }
        })
    return o(v, { children: c, value: { routes: {} } })
}

var h = typeof document < 'u'
if (h) {
    (r.process = {
        ...r.process,
        env: { ...(r.process ? r.process.env : void 0), NODE_ENV: 'production' }
    }),
        (r.__framer_events = r.__framer_events || []),
        L()
    let t = document.getElementById('main')
    'framerHydrateV2' in t.dataset ? H(!0, t) : H(!1, t)
}

async function H(t, n) {
    try {
        let R = function (e, C) {
            let l = C?.componentStack
            console.warn(
                'Recoverable error during hydration. Please check any custom code or code overrides to fix server/client mismatches.',
                e,
                l
            ),
                !(Math.random() > 0.01) &&
                O('published_site_load_recoverable_error', {
                    message: String(e),
                    componentStack: l,
                    stack: l
                        ? void 0
                        : e instanceof Error && typeof e.stack == 'string'
                            ? e.stack
                            : null
                })
        },
            a,
            i,
            c,
            m
        if (t) {
            let e = JSON.parse(n.dataset.framerHydrateV2)
                ; (a = e.routeId),
                    (i = e.localeId),
                    (c = e.pathVariables),
                    (m = e.breakpoints)
        } else {
            let e = S(u, decodeURIComponent(location.pathname), !0, A)
                ; (a = e.routeId), (i = e.localeId), (c = e.pathVariables)
        }
        let g = await B({ routeId: a, localeId: i, pathVariables: c })
        t
            ? (z('framer-rewrite-breakpoints', () => {
                V(m), r.__framer_onRewriteBreakpoints?.(m)
            }),
                f(() => {
                    E(), P(), k(), N(n, g, { onRecoverableError: R })
                }))
            : p(n, { onRecoverableError: R }).render(g)
    } catch (a) {
        throw (
            (O('published_site_load_error', {
                message: String(a),
                stack: a instanceof Error && typeof a.stack == 'string' ? a.stack : null
            }),
                a)
        )
    }
}

export { B as getPageRoot }
//#200907502023Dev
