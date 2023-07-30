import './Clipboard.css'
import React from 'react'

export function Clippy(props) {
  return (
    <svg 
        width='24'
        height='24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M10.0464 14C8.54044 12.4882 8.67609 9.90087 10.3494 8.22108L15.197 3.35462C16.8703 1.67483 19.4476 1.53865 20.9536 3.05046C22.4596 4.56228 22.3239 7.14956 20.6506 8.82935L18.2268 11.2626"/>
        <path d="M13.9536 10C15.4596 11.5118 15.3239 14.0991 13.6506 15.7789L11.2268 18.2121L8.80299 20.6454C7.12969 22.3252 4.55237 22.4613 3.0464 20.9495C1.54043 19.4377 1.67609 16.8504 3.34939 15.1706L5.77323 12.7373"/>
    </svg>
  )
}

export function Check(props) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M13.25 4.75L6 12L2.75 8.75' />
    </svg>
  )
}

export default function Clipboard({ copied, setCopied, text, color, className }) {
  const isColor = (strColor) => {
    if (strColor === undefined) {
      return false
    } else {
      const s = new Option().style
      s.color = strColor
      return s.color !== ''
    }
  }

  return (
    <div
      onClick={() => {
        setCopied(true)
        navigator.clipboard.writeText(text)
      }}
      className='button'
    >
      <Clippy
        className='icon'
        style={{
          color: isColor(color) ? color : 'black',
          strokeDasharray: 50,
          strokeDashoffset: copied ? -50 : 0,
          transition: 'all 300ms ease-in-out',
        }}
      />
      <Check
        className='icon'
        style={{
          color: isColor(color) ? color : 'black',
          strokeDasharray: 50,
          strokeDashoffset: copied ? 0 : -50,
          transition: 'all 300ms ease-in-out',
        }}
      />
    </div>
  )
}
