import React, { useEffect, useRef, useState } from 'react';

// Google reCAPTCHA Enterprise configuration
const RECAPTCHA_SITE_KEY = "6LffIWkrAAAAAP2lGSgRKNMO0y-TgMruE_rFGKhi";

export interface RecaptchaEnterpriseProps {
  onVerify?: (token: string) => void;
  onError?: (error: string) => void;
  onExpire?: () => void;
  className?: string;
}

// Global flag to track if reCAPTCHA is loaded
let recaptchaLoaded = false;

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
        render: (container: string | HTMLElement, options: any) => number;
        reset: (widgetId?: number) => void;
      };
    };
  }
}

export function RecaptchaEnterpriseComponent({
  onVerify,
  onError,
  onExpire,
  className = ''
}: RecaptchaEnterpriseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scriptError, setScriptError] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading security verification...');

  useEffect(() => {
    let isMounted = true;

    const initializeRecaptcha = async () => {
      if (!isMounted) return;

      try {
        setIsLoading(true);
        setScriptError(false);
        setLoadingMessage('Initializing security verification...');

        // Wait for reCAPTCHA to be ready
        const waitForRecaptcha = () => {
          return new Promise<void>((resolve, reject) => {
            if (typeof window !== 'undefined' && window.grecaptcha?.enterprise) {
              window.grecaptcha.enterprise.ready(() => {
                recaptchaLoaded = true;
                resolve();
              });
            } else {
              // Check periodically for reCAPTCHA
              const checkInterval = setInterval(() => {
                if (typeof window !== 'undefined' && window.grecaptcha?.enterprise) {
                  clearInterval(checkInterval);
                  window.grecaptcha.enterprise.ready(() => {
                    recaptchaLoaded = true;
                    resolve();
                  });
                }
              }, 100);

              // Timeout after 10 seconds
              setTimeout(() => {
                clearInterval(checkInterval);
                if (!recaptchaLoaded) {
                  reject(new Error('reCAPTCHA Enterprise failed to load'));
                }
              }, 10000);
            }
          });
        };

        await waitForRecaptcha();

        if (!isMounted || !containerRef.current) return;

        // Clear any existing widget
        if (widgetIdRef.current !== null && window.grecaptcha?.enterprise) {
          try {
            window.grecaptcha.enterprise.reset(widgetIdRef.current);
          } catch (e) {
            console.warn('Error resetting reCAPTCHA:', e);
          }
        }

        // Render the reCAPTCHA widget
        widgetIdRef.current = window.grecaptcha.enterprise.render(containerRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: 'dark',
          size: 'normal',
          callback: (token: string) => {
            console.log('reCAPTCHA Enterprise verified successfully');
            if (isMounted) {
              setIsLoading(false);
              onVerify?.(token);
            }
          },
          'error-callback': (error: string) => {
            console.error('reCAPTCHA Enterprise error:', error);
            if (isMounted) {
              setIsLoading(false);
              setScriptError(true);
              onError?.(error);
            }
          },
          'expired-callback': () => {
            console.log('reCAPTCHA Enterprise expired');
            if (isMounted) {
              onExpire?.();
            }
          }
        });

        if (isMounted) {
          setIsLoading(false);
          setScriptError(false);
          console.log('reCAPTCHA Enterprise rendered successfully');
        }

      } catch (error) {
        console.error('Error initializing reCAPTCHA Enterprise:', error);
        if (isMounted) {
          setIsLoading(false);
          setScriptError(true);
          onError?.('Failed to load security verification');
        }
      }
    };

    initializeRecaptcha();

    // Cleanup function
    return () => {
      isMounted = false;
      if (widgetIdRef.current !== null && typeof window !== 'undefined' && window.grecaptcha?.enterprise) {
        try {
          window.grecaptcha.enterprise.reset(widgetIdRef.current);
        } catch (error) {
          console.warn('Error cleaning up reCAPTCHA Enterprise:', error);
        }
      }
      widgetIdRef.current = null;
    };
  }, [onVerify, onError, onExpire]);

  return (
    <div className={`recaptcha-wrapper ${className}`} style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        className="recaptcha-container"
        style={{
          minHeight: '78px',
          minWidth: '304px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />

      {isLoading && (
        <div
          className="recaptcha-loading"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#D4AF37',
            fontSize: '14px',
            textAlign: 'center'
          }}
        >
          {loadingMessage}
        </div>
      )}

      {scriptError && (
        <div
          className="recaptcha-error"
          style={{
            padding: '10px',
            background: '#2a1810',
            border: '1px solid #d97706',
            borderRadius: '4px',
            color: '#fbbf24',
            fontSize: '12px',
            textAlign: 'center'
          }}
        >
          <div style={{ marginBottom: '8px' }}>
            ⚠️ Security verification unavailable
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#d97706',
              color: 'white',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

// Function to execute invisible reCAPTCHA for form submissions
export async function executeRecaptcha(action = 'submit'): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.grecaptcha?.enterprise) {
      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action });
          resolve(token);
        } catch (error) {
          reject(error);
        }
      });
    } else {
      reject(new Error('reCAPTCHA Enterprise not loaded'));
    }
  });
}
