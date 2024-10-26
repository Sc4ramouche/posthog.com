import React from 'react'
const pluginsSprite =
    'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/ProductFeaturePlugin/images/sprite-plugins.svg'

interface ProductFeaturePluginProps {
    handle: string
    name: string
}

export const ProductFeaturePlugin = ({ handle, name }: ProductFeaturePluginProps) => {
    return (
        <li style={{ maxWidth: '120px' }}>
            <svg className="icon width-[32px] height-[32px] mx-auto" style={{ width: '32px', height: '32px' }}>
                <use href={pluginsSprite + '#plugins-' + `${handle}`} />
            </svg>
            <span className="text-sm font-semibold text-opacity-50 leading-none">{name}</span>
        </li>
    )
}
