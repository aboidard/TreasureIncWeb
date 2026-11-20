import React, { useEffect, useRef } from 'react'

/** Shared building blocks of the admin page, in the dark style of the site. */

const BUTTON_VARIANTS = {
    primary: 'bg-gray-500 hover:bg-gray-400 text-white ring-2 ring-black',
    danger: 'bg-red-700 hover:bg-red-600 text-white ring-2 ring-black',
    ghost: 'bg-gray-900 hover:bg-gray-700 text-gray-200',
}

export function Button({ variant = 'primary', className = '', disabled, children, ...props }) {
    return (
        <button
            type="button"
            disabled={disabled}
            className={`px-4 py-2 rounded-md shadow-lg text-sm focus:outline-none ${BUTTON_VARIANTS[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            {...props}>
            {children}
        </button>
    )
}

export function Panel({ title, actions, children, className = '' }) {
    return (
        <section className={`bg-black bg-opacity-60 rounded-xl p-6 mb-6 shadow-2xl ${className}`}>
            {(title || actions) &&
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    {title && <h2 className="font-kenvector text-xl text-gray-100">{title}</h2>}
                    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
                </div>
            }
            {children}
        </section>
    )
}

export function ErrorBanner({ error, onRetry }) {
    if (!error) return null
    return (
        <div role="alert" className="flex flex-wrap items-center justify-between gap-2 bg-red-900 bg-opacity-80 text-red-100 rounded-md px-4 py-3 mb-4">
            <span>{error.message || String(error)}{error.status ? ` (HTTP ${error.status})` : ''}</span>
            {onRetry && <Button variant="ghost" onClick={onRetry}>Réessayer</Button>}
        </div>
    )
}

export function SuccessBanner({ children }) {
    if (!children) return null
    return (
        <div role="status" className="bg-green-900 bg-opacity-80 text-green-100 rounded-md px-4 py-3 mb-4">
            {children}
        </div>
    )
}

export function Spinner({ className = '' }) {
    return <span className={`inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-200 align-middle ${className}`} />
}

/**
 * Modal asking the admin to confirm an action that has side effects.
 */
export function ConfirmDialog({ open, title, children, confirmLabel = 'Confirmer', danger = false, onConfirm, onCancel }) {
    const cancelRef = useRef(null)
    useEffect(() => {
        if (!open) return
        cancelRef.current && cancelRef.current.focus()
        const onKey = e => { if (e.key === 'Escape') onCancel() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, onCancel])

    if (!open) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4" onClick={onCancel}>
            <div role="dialog" aria-modal="true" className="bg-gray-800 ring-4 ring-black rounded-xl p-6 max-w-md w-full text-white"
                onClick={e => e.stopPropagation()}>
                <h3 className="font-kenvector text-lg mb-3">{title}</h3>
                <div className="mb-6 text-gray-200">{children}</div>
                <div className="flex justify-end gap-3">
                    <button ref={cancelRef} type="button" onClick={onCancel}
                        className="px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-700 text-gray-200 text-sm">Annuler</button>
                    <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmLabel}</Button>
                </div>
            </div>
        </div>
    )
}

export const inputClassName = 'py-2 px-3 text-white bg-gray-900 rounded-md focus:outline-none text-sm focus:bg-white focus:text-gray-900'
