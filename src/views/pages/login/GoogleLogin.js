import { useEffect, useRef } from 'react'

export default function GoogleLogin({ onGoogleSignIn = () => {}, text = 'signin_with' }) {
  const googleSignInButton = useRef(null)

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: onGoogleSignIn,
    })
    window.google.accounts.id.renderButton(googleSignInButton.current, {
      theme: 'filled_black',
      size: 'large',
      text,
      width: '250',
    })
  })

  return <div ref={googleSignInButton}></div>
}

const useScript = (url, onload) => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.onload = onload

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [url, onload])
}
