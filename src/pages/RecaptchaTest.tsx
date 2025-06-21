import type React from 'react';
import { useState } from 'react';
import { RecaptchaEnterpriseComponent } from '@/lib/recaptcha-enterprise';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const RecaptchaTest: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onCaptchaVerify = (captchaToken: string) => {
    console.log('reCAPTCHA Enterprise verified with token:', captchaToken);
    setToken(captchaToken);
    toast.success('reCAPTCHA Enterprise verification completed!');
  };

  const onCaptchaError = (error: string) => {
    console.error('reCAPTCHA Enterprise error:', error);
    toast.error('reCAPTCHA Enterprise verification failed');
    setToken('');
  };

  const onCaptchaExpired = () => {
    console.log('reCAPTCHA Enterprise expired');
    toast.warning('reCAPTCHA Enterprise verification expired');
    setToken('');
  };

  const testServerVerification = async () => {
    if (!token) {
      toast.error('Please complete the reCAPTCHA verification first');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/test-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      setTestResult(data);

      if (response.ok && data.result?.success) {
        toast.success('Server-side verification successful!');
      } else {
        toast.error('Server-side verification failed');
      }
    } catch (error) {
      console.error('Test error:', error);
      toast.error('Network error during test');
      setTestResult({ error: 'Network error', details: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="text-green">reCAPTCHA Enterprise</span> Test Page
          </h1>
          <p className="text-gray-300">
            Test the Google reCAPTCHA Enterprise integration with project ID: grand-aileron-463622-e2
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* reCAPTCHA Widget */}
          <Card className="bg-zinc-900 border-green">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                reCAPTCHA Enterprise Widget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-center p-4 bg-black rounded border border-green">
                  <RecaptchaEnterpriseComponent
                    onVerify={onCaptchaVerify}
                    onError={onCaptchaError}
                    onExpire={onCaptchaExpired}
                  />
                </div>

                {token && (
                  <div className="space-y-2">
                    <div className="flex items-center text-green">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="text-sm">Token received successfully</span>
                    </div>
                    <div className="bg-black p-3 rounded border border-green">
                      <p className="text-xs text-gray-400 mb-1">Token (first 50 chars):</p>
                      <p className="text-white text-xs font-mono break-all">
                        {token.substring(0, 50)}...
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  onClick={testServerVerification}
                  disabled={!token || isLoading}
                  className="w-full bg-green hover:bg-gold text-black font-semibold"
                >
                  {isLoading ? 'Testing Server Verification...' : 'Test Server Verification'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card className="bg-zinc-900 border-green">
            <CardHeader>
              <CardTitle className="text-gold flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Server Verification Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {testResult ? (
                <div className="space-y-4">
                  {testResult.result?.success ? (
                    <div className="flex items-center text-green">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Verification Successful!</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <XCircle className="h-4 w-4 mr-2" />
                      <span>Verification Failed</span>
                    </div>
                  )}

                  <div className="bg-black p-4 rounded border border-green">
                    <pre className="text-xs text-white overflow-auto">
                      {JSON.stringify(testResult, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <p>Complete the reCAPTCHA verification and click "Test Server Verification" to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* API Information */}
        <Card className="bg-zinc-900 border-green mt-8">
          <CardHeader>
            <CardTitle className="text-gold">API Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white font-medium">Project ID:</p>
                <p className="text-green">grand-aileron-463622-e2</p>
              </div>
              <div>
                <p className="text-white font-medium">Site Key:</p>
                <p className="text-green">6LffIWkrAAAAAP2lGSgRKNMO0y-TgMruE_rFGKhi</p>
              </div>
              <div>
                <p className="text-white font-medium">API Endpoint:</p>
                <p className="text-green text-xs break-all">
                  https://recaptchaenterprise.googleapis.com/v1/projects/grand-aileron-463622-e2/assessments
                </p>
              </div>
              <div>
                <p className="text-white font-medium">Expected Action:</p>
                <p className="text-green">submit</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecaptchaTest;
