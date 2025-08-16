import React from "react";
import { useParams, useNavigate } from "react-router";
import supabase from "../Supabase/supabaseClient";

export default function Redirect() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    handleRedirect();
  }, [shortCode]);

  const handleRedirect = async () => {
    try {
      // Fetch the URL record
      const { data: urlData, error: fetchError } = await supabase
        .from('urls')
        .select('*')
        .eq('short_code', shortCode)
        .single();

      if (fetchError || !urlData) {
        setError('URL not found');
        setLoading(false);
        return;
      }

      // Check if URL is expired
      if (urlData.expires_at && new Date(urlData.expires_at) < new Date()) {
        setError('This link has expired');
        setLoading(false);
        return;
      }

      // Increment click count
      const { error: updateError } = await supabase
        .from('urls')
        .update({ click_count: urlData.click_count + 1 })
        .eq('id', urlData.id);

      if (updateError) {
        console.error('Error updating click count:', updateError);
        // Continue with redirect even if click count update fails
      }

      // Redirect to original URL
      window.location.href = urlData.original_url;

    } catch (error) {
      console.error('Error in handleRedirect:', error);
      setError('An error occurred while processing the redirect');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-lg">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4">Link Error</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return null;
}
