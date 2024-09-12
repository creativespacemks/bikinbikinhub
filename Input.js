import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { useCallback, useState } from 'react'
import {
    addPropertyControls,
    ControlType,
    withCSS,
    useRouter,
    inferInitialRouteFromPath
} from 'framer'
import { motion, useAnimationControls } from 'framer-motion'
const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const mailchimpRegex = /^https?:\/\/([^\/]+)[^\?]+\??(.+)$/
const validateEmail = email => {
    return emailRegex.test(String(email).toLowerCase())
}
const parseMailChimpUrl = url => {
    var _url_replace_match
    const [, domain, parameters] =
        (_url_replace_match = url.replace('&amp;', '&').match(mailchimpRegex)) !==
            null && _url_replace_match !== void 0
            ? _url_replace_match
            : [null, null, null]
    return [domain, parameters ? new URLSearchParams(parameters) : null]
}
function safeURL(url) {
    console.log(url)
    try {
        new URL(url)
        return url
    } catch {
        try {
            new URL(`https://${url}`)
            return `https://${url}`
        } catch { }
    }
    return undefined
}
function isInternalURL(href) {
    if (href === undefined) return false
    if (href.startsWith('#') || href.startsWith('/') || href.startsWith('.'))
        return true
    return false
}
/**
 * Increment the number whenever shipping a new version to customers.
 * This will ensure that multiple versions of this component can exist
 * in the same project without css rules overlapping. Only use valid css class characters.
 */ const VERSION = 'v1'
/**
 * INPUT
 * By Benjamin den Boer
 *
 * @framerDisableUnlink
 *
 * @framerIntrinsicWidth 300
 * @framerIntrinsicHeight 40
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight any
 */ const Input = withCSS(
    function Input({
        service,
        redirectAs,
        mailchimpURL,
        loopsID,
        loopsUserGroup,
        formsparkID,
        getwaitlistAPI,
        convertkitAPI,
        convertkitFormID,
        input,
        button,
        font,
        layout,
        link,
        gap,
        style,
        onSubmit
    }) {
        const [email, setEmail] = useState('')
        const [isError, setError] = useState(false)
        const [isLoading, setLoading] = useState(false)
        const [isFocus, setFocus] = useState(false) // Padding
        const {
            paddingPerSide,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            padding,
            borderRadius,
            borderObject,
            focusObject,
            shadowObject,
            height,
            fixedHeight
        } = input
        const {
            buttonPaddingPerSide,
            buttonPaddingTop,
            buttonPaddingRight,
            buttonPaddingBottom,
            buttonPaddingLeft,
            buttonPadding
        } = button
        const paddingValue = paddingPerSide
            ? `${paddingTop}px ${button.isDocked ? paddingRight + button.widthWhenDocked : paddingRight
            }px ${paddingBottom}px ${paddingLeft}px`
            : `${padding}px ${button.isDocked ? padding + button.widthWhenDocked : padding
            }px ${padding}px ${padding}px`
        const buttonPaddingValue = buttonPaddingPerSide
            ? `${button.isDocked ? 0 : buttonPaddingTop}px ${buttonPaddingRight}px ${button.isDocked ? 0 : buttonPaddingBottom
            }px ${buttonPaddingLeft}px`
            : `${button.isDocked ? 0 : buttonPadding}px ${buttonPadding}px ${button.isDocked ? 0 : buttonPadding
            }px ${buttonPadding}px`
        const router = useRouter()
        const onSuccess = () => {
      /* Reset */ setLoading(false)
            setFocus(false)
            setEmail('')
            if (redirectAs === 'link' && link && !isError) {
                const [path, hash] = link.split('#')
                const { routeId, pathVariables } = inferInitialRouteFromPath(
                    router.routes,
                    path
                )
                if (routeId) {
                    router.navigate(routeId, hash, pathVariables)
                }
                if (!isInternalURL(link)) {
                    const url = safeURL(link)
                    if (url) window.open(url, '_blank')
                }
            }
        }
        const validateForm = useCallback(
            email => {
                if (email === '' || !validateEmail(email)) {
                    setError(true)
                    formControls.start('error')
                    return false
                }
                return true
            },
            [validateEmail]
        )
        const handleChange = useCallback(event => {
            setError(false)
            setEmail(event.target.value)
        }, [])
        const handleFocus = useCallback(event => {
            setFocus(true)
        }, [])
        const handleBlur = useCallback(event => {
            setFocus(false)
            setError(false)
        }, [])
        const handleSubmit = useCallback(
            event => {
                event.preventDefault() // Prevent submitting while submitting
                if (isLoading) return
                setLoading(true)
                if (service === 'mailchimp') {
                    const [domain, parameters] = parseMailChimpUrl(mailchimpURL)
                    if (!validateForm(email) || !domain || !parameters) {
                        setLoading(false)
                        return
                    } // MERGE0 is Mailchimp’s email field name
                    parameters.set('MERGE0', email)
                    fetch(`https://${domain}/subscribe/post`, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        body: parameters.toString()
                    })
                        .then(response => {
                            onSuccess()
                            if (redirectAs === 'overlay')
                                onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit()
                        })
                        .catch(error => {
                            console.error(error)
                            setLoading(false)
                            setError(true)
                            formControls.start('error')
                        })
                }
                if (service === 'loops') {
                    if (!validateForm(email)) {
                        setLoading(false)
                        return
                    }
                    const emailBody = `email=${encodeURIComponent(email)}`
                    const userGroupBody = `userGroup=${encodeURIComponent(
                        loopsUserGroup
                    )}`
                    const hasUserGroup = !!loopsUserGroup && loopsUserGroup !== ' '
                    const formBody = hasUserGroup
                        ? emailBody + '&' + userGroupBody
                        : emailBody
                    fetch(`https://app.loops.so/api/newsletter-form/${loopsID}`, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: formBody
                    })
                        .then(() => {
                            onSuccess()
                            if (redirectAs === 'overlay')
                                onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit()
                        })
                        .catch(error => {
                            console.error(error)
                            setLoading(false)
                            setError(true)
                            formControls.start('error')
                        })
                }
                if (service === 'formspark') {
                    if (!validateForm(email)) {
                        setLoading(false)
                        return
                    }
                    const data = new FormData(event.target)
                    const entries = Object.fromEntries(data.entries())
                    fetch(`https://api.formspark.io/${formsparkID}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify(entries)
                    })
                        .then(() => {
                            onSuccess()
                            onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit()
                        })
                        .catch(error => {
                            console.error(error)
                            setLoading(false)
                            setError(true)
                            formControls.start('error')
                        })
                }
                if (service === 'getwaitlist') {
                    if (!validateForm(email)) {
                        setLoading(false)
                        return
                    }
                    const formData = new FormData(event.target)
                    const data = Object.fromEntries(formData.entries())
                    data.referral_link = document.URL
                    fetch(
                        `https://api.getwaitlist.com/api/v1
/waiter/`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json'
                            },
                            body: JSON.stringify(data)
                        }
                    )
                        .then(() => {
                            onSuccess()
                            if (redirectAs === 'overlay')
                                onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit()
                        })
                        .catch(error => {
                            console.error(error)
                            setLoading(false)
                            setError(true)
                            formControls.start('error')
                        })
                }
                if (service === 'convertkit') {
                    if (!validateForm(email)) {
                        setLoading(false)
                        return
                    }
                    const formData = new FormData(event.target)
                    const data = Object.fromEntries(formData.entries())
                    data.referral_link = document.URL
                    data.api_key = convertkitAPI
                    fetch(
                        `https://api.convertkit.com/v3/forms/${convertkitFormID}/subscribe`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json'
                            },
                            body: JSON.stringify(data)
                        }
                    )
                        .then(() => {
                            onSuccess()
                            if (redirectAs === 'overlay')
                                onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit()
                        })
                        .catch(error => {
                            console.error(error)
                            setLoading(false)
                            setError(true)
                            formControls.start('error')
                        })
                }
            },
            [
                mailchimpURL,
                formsparkID,
                convertkitFormID,
                email,
                onSubmit,
                validateForm,
                isLoading
            ]
        ) // Animation
        const formControls = useAnimationControls() // Input Box Shadow Stylees
        const focusStylesFrom = input.focusObject
            ? `inset 0 0 0 ${focusObject.focusWidthFrom}px ${focusObject.focusColor}`
            : null
        const focusStylesTo = input.focusObject
            ? `inset 0 0 0 ${focusObject.focusWidthTo}px ${focusObject.focusColor}`
            : null
        const shadowStyles = input.shadowObject
            ? `${shadowObject.shadowX}px ${shadowObject.shadowY}px ${shadowObject.shadowBlur}px ${shadowObject.shadowColor}`
            : null
        const borderStyles = input.borderObject
            ? `inset 0 0 0 ${borderObject.borderWidth}px ${borderObject.borderColor}`
            : null // Shake or wiggle as error
        const formVariants = {
            default: { x: 0 },
            error: { x: [0, -4, 4, 0], transition: { duration: 0.2 } }
        }
        const inputVariants = {
            default: {
                boxShadow: dynamicBoxShadow(focusStylesFrom, shadowStyles, borderStyles)
            },
            focused: {
                boxShadow: dynamicBoxShadow(focusStylesTo, shadowStyles, borderStyles)
            }
        }
        return /*#__PURE__*/ _jsx(motion.div, {
            style: {
                ...style,
                ...containerStyles,
                '--framer-custom-placeholder-color': input.placeholderColor
            },
            variants: formVariants,
            animate: formControls,
            children: /*#__PURE__*/ _jsxs('form', {
                style: {
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    position: 'relative',
                    flexDirection: layout === 'vertical' ? 'column' : 'row',
                    color: button.color,
                    gap: button.isDocked ? 0 : gap
                },
                onSubmit: handleSubmit,
                method: 'POST',
                children: [
                    service === 'getwaitlist' &&
            /*#__PURE__*/ _jsx('input', {
                        type: 'hidden',
                        name: 'api_key',
                        value: getwaitlistAPI
                    }),
                    service === 'convertkit' &&
            /*#__PURE__*/ _jsx('input', {
                        type: 'hidden',
                        name: 'api_key',
                        value: convertkitAPI
                    }),
          /*#__PURE__*/ _jsx(motion.input, {
                        type: 'email',
                        name: 'email',
                        placeholder: input.placeholder,
                        value: email,
                        className: `${VERSION} framer-custom-input`,
                        onChange: handleChange,
                        onFocus: handleFocus,
                        onBlur: handleBlur,
                        autoComplete: 'off',
                        autoCapitalize: 'off',
                        autoCorrect: 'off',
                        spellCheck: 'false',
                        style: {
                            ...defaultStyle,
                            padding: paddingValue,
                            borderRadius,
                            fontSize: 16,
                            ...font,
                            background: input.fill,
                            height: height ? 'auto' : fixedHeight,
                            color: input.color,
                            boxShadow: dynamicBoxShadow(
                                focusStylesFrom,
                                shadowStyles,
                                borderStyles
                            )
                        },
                        variants: inputVariants,
                        initial: false,
                        animate: isFocus ? 'focused' : 'default',
                        transition: { duration: 0.3 },
                        'data-1p-ignore': true
                    }),
                    !button.shouldAppear &&
                    isLoading &&
            /*#__PURE__*/ _jsx(Spinner, {
                        shouldAppear: button.shouldAppear,
                        paddingPerSide: paddingPerSide,
                        paddingTop: paddingTop,
                        paddingRight: paddingRight,
                        padding: padding,
                        color: input.color
                    }),
                    button.shouldAppear &&
            /*#__PURE__*/ _jsxs('div', {
                        style: {
                            position: button.isDocked ? 'absolute' : 'relative',
                            top: button.isDocked ? button.insetWhenDocked : 0,
                            right: button.isDocked ? button.insetWhenDocked : 0,
                            bottom: button.isDocked ? button.insetWhenDocked : 0
                        },
                        children: [
                /*#__PURE__*/ _jsx(motion.input, {
                            type: 'submit',
                            value: button.label,
                            style: {
                                ...defaultStyle,
                                width: button.isDocked ? button.widthWhenDocked : '100%',
                                height: height ? '100%' : fixedHeight,
                                cursor: 'pointer',
                                padding: buttonPaddingValue,
                                borderRadius: button.isDocked
                                    ? borderRadius - button.insetWhenDocked
                                    : borderRadius, // fontWeight: button.fontWeight,
                                fontSize: 16,
                                ...button.buttonFont,
                                background: button.fill,
                                color: button.color,
                                zIndex: 1,
                                boxShadow: getButtonShadow(button)
                            }
                        }),
                            isLoading &&
                  /*#__PURE__*/ _jsx('div', {
                                style: {
                                    borderRadius: button.isDocked
                                        ? borderRadius - button.insetWhenDocked
                                        : borderRadius,
                                    position: 'absolute',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                    inset: 0,
                                    zIndex: 2,
                                    color: button.color,
                                    background: button.fill
                                },
                                children: /*#__PURE__*/ _jsx(Spinner, {
                                    color: button.color
                                })
                            })
                        ]
                    })
                ]
            })
        })
    },
    [
        `.${VERSION}.framer-custom-input::placeholder { color: var(--framer-custom-placeholder-color) !important; }`
    ]
)
const Spinner = props => {
    const noButtonStyles = !props.shouldAppear
        ? {
            position: 'absolute',
            top: `calc(50% - 8px)`,
            right: props.paddingPerSide ? props.paddingRight : props.padding
        }
        : {}
    return /*#__PURE__*/ _jsx(motion.div, {
        style: { height: 16, width: 16, ...noButtonStyles },
        initial: { rotate: 0 },
        animate: { rotate: 360 },
        transition: { duration: 1, repeat: Infinity },
        children: /*#__PURE__*/ _jsx(motion.div, {
            initial: { scale: 0 },
            animate: { scale: 1 },
            children: /*#__PURE__*/ _jsxs('svg', {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '16',
                height: '16',
                style: { fill: 'currentColor', color: props.color },
                children: [
          /*#__PURE__*/ _jsx('path', {
                    d: 'M 8 0 C 3.582 0 0 3.582 0 8 C 0 12.419 3.582 16 8 16 C 12.418 16 16 12.419 16 8 C 15.999 3.582 12.418 0 8 0 Z M 8 14 C 4.687 14 2 11.314 2 8 C 2 4.687 4.687 2 8 2 C 11.314 2 14 4.687 14 8 C 14 11.314 11.314 14 8 14 Z',
                    fill: 'currentColor',
                    opacity: '0.2'
                }),
          /*#__PURE__*/ _jsx('path', {
                    d: 'M 8 0 C 12.418 0 15.999 3.582 16 8 C 16 8 16 9 15 9 C 14 9 14 8 14 8 C 14 4.687 11.314 2 8 2 C 4.687 2 2 4.687 2 8 C 2 8 2 9 1 9 C 0 9 0 8 0 8 C 0 3.582 3.582 0 8 0 Z',
                    fill: 'currentColor'
                })
                ]
            })
        })
    })
}
addPropertyControls(Input, {
    service: {
        title: 'Service',
        type: ControlType.Enum,
        options: ['loops', 'formspark', 'mailchimp', 'getwaitlist', 'convertkit'],
        optionTitles: [
            'Loops',
            'FormSpark',
            'MailChimp',
            'Get Waitlist',
            'ConvertKit'
        ],
        defaultValue: 'loops'
    },
    mailchimpURL: {
        title: 'URL',
        placeholder: 'https://***.us6.list-manage.com/subscribe/post?u=***',
        type: ControlType.String,
        hidden: props => props.service !== 'mailchimp'
    },
    loopsID: {
        title: 'ID',
        placeholder: 'klm2jxy0i98abzr01pq7defg5',
        type: ControlType.String,
        hidden: props => props.service !== 'loops'
    },
    loopsUserGroup: {
        title: 'User Group',
        type: ControlType.String,
        placeholder: 'Title',
        optional: true,
        hidden: props => props.service !== 'loops'
    },
    formsparkID: {
        title: 'ID',
        placeholder: '7PbPpGN3',
        type: ControlType.String,
        hidden: props => props.service !== 'formspark'
    },
    getwaitlistAPI: {
        title: 'ID',
        placeholder: '9148',
        type: ControlType.String,
        hidden: props => props.service !== 'getwaitlist'
    },
    convertkitAPI: {
        title: 'API Key',
        placeholder: '5opis1WK6xnVsBwrOINUpe',
        type: ControlType.String,
        hidden: props => props.service !== 'convertkit'
    },
    convertkitFormID: {
        title: 'Form ID',
        placeholder: '1043389',
        type: ControlType.String,
        hidden: props => props.service !== 'convertkit'
    },
    redirectAs: {
        title: 'Success',
        type: ControlType.Enum,
        options: ['link', 'overlay'],
        optionTitles: ['Open Link', 'Show Overlay'],
        defaultValue: 'link'
    },
    link: {
        title: 'Redirect',
        type: ControlType.Link,
        hidden: props => props.redirectAs === 'overlay'
    },
    onSubmit: {
        title: 'Submit',
        type: ControlType.EventHandler,
        hidden: props => props.redirectAs === 'link'
    },
    layout: {
        title: 'Layout',
        type: ControlType.Enum,
        options: ['horizontal', 'vertical'],
        displaySegmentedControl: true,
        hidden: props => props.button.isDocked
    },
    font: { type: ControlType.Font, title: 'Font', controls: 'extended' },
    input: {
        title: 'Input',
        type: ControlType.Object,
        controls: {
            placeholder: {
                title: 'Placeholder',
                type: ControlType.String,
                defaultValue: 'name@email.com'
            },
            placeholderColor: {
                title: ' ',
                type: ControlType.Color,
                defaultValue: 'rgba(0, 0, 0, 0.3)'
            },
            fill: { title: 'Fill', type: ControlType.Color, defaultValue: '#EBEBEB' },
            color: { title: 'Text', type: ControlType.Color, defaultValue: '#000' },
            height: {
                title: 'Height',
                type: ControlType.Boolean,
                enabledTitle: 'Auto',
                disabledTitle: 'Fixed'
            },
            fixedHeight: {
                title: ' ',
                type: ControlType.Number,
                displayStepper: true,
                min: 0,
                defaultValue: 50,
                hidden: props => props.height
            },
            padding: {
                title: 'Padding',
                type: ControlType.FusedNumber,
                toggleKey: 'paddingPerSide',
                toggleTitles: ['Padding', 'Padding per side'],
                defaultValue: 15,
                valueKeys: [
                    'paddingTop',
                    'paddingRight',
                    'paddingBottom',
                    'paddingLeft'
                ],
                valueLabels: ['T', 'R', 'B', 'L'],
                min: 0
            },
            borderRadius: {
                title: 'Radius',
                type: ControlType.Number,
                displayStepper: true,
                min: 0,
                defaultValue: 8
            },
            focusObject: {
                type: ControlType.Object,
                title: 'Focus',
                optional: true,
                controls: {
                    focusWidthFrom: {
                        title: 'From',
                        type: ControlType.Number,
                        displayStepper: true,
                        defaultValue: 0
                    },
                    focusWidthTo: {
                        title: 'To',
                        type: ControlType.Number,
                        displayStepper: true,
                        defaultValue: 2
                    },
                    focusColor: {
                        title: 'Color',
                        type: ControlType.Color,
                        defaultValue: '#09F'
                    }
                }
            },
            borderObject: {
                type: ControlType.Object,
                title: 'Border',
                optional: true,
                controls: {
                    borderWidth: {
                        title: 'Width',
                        type: ControlType.Number,
                        displayStepper: true,
                        defaultValue: 1
                    },
                    borderColor: {
                        title: 'Color',
                        type: ControlType.Color,
                        defaultValue: 'rgba(200,200,200,0.5)'
                    }
                }
            },
            shadowObject: {
                type: ControlType.Object,
                title: 'Shadow',
                optional: true,
                controls: {
                    shadowColor: {
                        title: 'Color',
                        type: ControlType.Color,
                        defaultValue: 'rgba(0,0,0,0.25)'
                    },
                    shadowX: {
                        title: 'Shadow X',
                        type: ControlType.Number,
                        min: -100,
                        max: 100,
                        defaultValue: 0
                    },
                    shadowY: {
                        title: 'Shadow Y',
                        type: ControlType.Number,
                        min: -100,
                        max: 100,
                        defaultValue: 2
                    },
                    shadowBlur: {
                        title: 'Shadow B',
                        type: ControlType.Number,
                        min: 0,
                        max: 100,
                        defaultValue: 4
                    }
                }
            }
        }
    },
    button: {
        title: 'Button',
        type: ControlType.Object,
        controls: {
            shouldAppear: {
                title: 'Show',
                type: ControlType.Boolean,
                defaultValue: true
            },
            label: {
                title: 'Label',
                type: ControlType.String,
                defaultValue: 'Subscribe'
            },
            buttonFont: {
                type: ControlType.Font,
                title: 'Font',
                controls: 'extended'
            },
            fill: { title: 'Fill', type: ControlType.Color, defaultValue: '#333' },
            color: { title: 'Text', type: ControlType.Color, defaultValue: '#FFF' },
            isDocked: {
                title: 'Docked',
                type: ControlType.Boolean,
                defaultValue: false
            },
            widthWhenDocked: {
                title: 'Width',
                type: ControlType.Number,
                min: 0,
                defaultValue: 100,
                displayStepper: true,
                hidden: props => !props.isDocked
            },
            insetWhenDocked: {
                title: 'Inset',
                type: ControlType.Number,
                min: 0,
                defaultValue: 5,
                displayStepper: true,
                hidden: props => !props.isDocked
            },
            buttonPadding: {
                title: 'Padding',
                type: ControlType.FusedNumber,
                toggleKey: 'buttonPaddingPerSide',
                toggleTitles: ['Padding', 'Padding per side'],
                defaultValue: 15,
                valueKeys: [
                    'buttonPaddingTop',
                    'buttonPaddingRight',
                    'buttonPaddingBottom',
                    'buttonPaddingLeft'
                ],
                valueLabels: ['T', 'R', 'B', 'L'],
                min: 0
            },
            buttonShadow: {
                type: ControlType.Object,
                title: 'Shadow',
                optional: true,
                controls: {
                    shadowColor: {
                        title: 'Color',
                        type: ControlType.Color,
                        defaultValue: 'rgba(0,0,0,0.25)'
                    },
                    shadowX: {
                        title: 'Shadow X',
                        type: ControlType.Number,
                        min: -100,
                        max: 100,
                        defaultValue: 0
                    },
                    shadowY: {
                        title: 'Shadow Y',
                        type: ControlType.Number,
                        min: -100,
                        max: 100,
                        defaultValue: 2
                    },
                    shadowBlur: {
                        title: 'Shadow B',
                        type: ControlType.Number,
                        min: 0,
                        max: 100,
                        defaultValue: 4
                    }
                }
            }
        }
    },
    gap: {
        title: 'Gap',
        type: ControlType.Number,
        displayStepper: true,
        min: 0,
        defaultValue: 10,
        hidden: props => props.button.isDocked
    }
})
const defaultStyle = {
    WebkitAppearance: 'none',
    appearance: 'none',
    width: '100%',
    height: 'auto',
    outline: 'none',
    border: 'none'
}
const containerStyles = {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}
function getButtonShadow(button) {
    if (button.buttonShadow) {
        return `${button.buttonShadow.shadowX}px ${button.buttonShadow.shadowY}px ${button.buttonShadow.shadowBlur}px ${button.buttonShadow.shadowColor}`
    } else return 'none'
}
function dynamicBoxShadow(...shadows) {
    const output = []
    shadows.forEach(shadow => shadow && output.push(shadow))
    return output.join(', ')
}
export default Input
export const __FramerMetadata__ = {
    exports: {
        default: {
            type: 'reactComponent',
            name: 'Input',
            slots: [],
            annotations: {
                framerIntrinsicHeight: '40',
                framerIntrinsicWidth: '300',
                framerSupportedLayoutHeight: 'any',
                framerSupportedLayoutWidth: 'fixed',
                framerContractVersion: '1',
                framerDisableUnlink: '*'
            }
        },
        __FramerMetadata__: { type: 'variable' }
    }
}
