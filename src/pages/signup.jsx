import React from 'react'
import { useNavigate } from 'react-router'
import supabase from '../Supabase/supabaseClient.js'

function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const {data:existingUser , error:userError} = await supabase.from('users').select().eq('email', email).single();
    
    if (existingUser) {
      setErrorMsg('User already exists. Please login.');
      setLoading(false);
      return;
    }
    const { error:authError , data } = await supabase.auth.signUp({ email, password });
    if (authError) {
      console.error('Error signing up:', authError);
      setErrorMsg(authError.message || 'Failed to sign up. Please try again.');
    } else {
      // If email confirmation is enabled, data.user may be null until the user confirms.
      const userId = data?.user?.id;
      if (!userId) {
        setSuccessMsg('Sign up successful! Check your inbox for the confirmation email.');
        setTimeout(() => navigate('/login'), 1800);
      } else {
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ id: userId, email, username, plan: 'Free' }]);
        if (insertError) {
          console.error('Error inserting user:', insertError);
          setErrorMsg('Failed to create user. Please try again.');
        } else {
          setSuccessMsg('Sign up successful! Check your inbox for the confirmation email.');
          setTimeout(() => navigate('/login'), 1800);
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 relative">
      {/* Success Message */}
      {successMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg bg-green-50 border border-green-200 shadow-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-800 text-sm font-medium">{successMsg}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-600">Join FastURL and start shortening your URLs</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-800 text-sm">{errorMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/landing')}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup