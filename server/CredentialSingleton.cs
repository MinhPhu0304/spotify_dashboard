using System;
namespace server
{
    public class CredentialSingleton 
    {
        private static CredentialSingleton credentialInstance;
        public string spotifyClientId { get; set; }
        public string spotifyClientSecret { get; set; }

        public string redirectURI { get; }
        public string dashboardURI { get; }
        private CredentialSingleton()
        {
            if (string.IsNullOrEmpty(Environment.GetEnvironmentVariable("AWS_LAMBDA_FUNCTION_NAME")))
            {
                redirectURI = "https://localhost:5001/oauth/callback";
                dashboardURI = "http://localhost:3000/callback";
            }
            else
            {
                redirectURI = Environment.GetEnvironmentVariable("CALLBACK_URI");
                dashboardURI = Environment.GetEnvironmentVariable("DASHBOARD_URI");
            }
        }

        public static CredentialSingleton getInstance ()
        {
            if (credentialInstance != null)
            {
                return credentialInstance;
            }
            credentialInstance = new CredentialSingleton();
            return credentialInstance;
        }
    }
}
