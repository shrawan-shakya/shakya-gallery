import { DocumentActionComponent } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const QRPrintAction: DocumentActionComponent = (props) => {
    const { type, published, draft } = props
    const doc = draft || published

    // Only show the action for artwork documents
    if (type !== 'artwork') return null

    return {
        label: 'Print QR Code',
        icon: LinkIcon,
        onHandle: () => {
            // Open the print page in a new window
            if (doc?.slug && (doc.slug as any).current) {
                window.open(`/admin/qr/${(doc.slug as any).current}`, '_blank')
            } else {
                alert("This artwork doesn't have a valid route yet. Please generate a Slug URL first.")
            }
        },
    }
}
