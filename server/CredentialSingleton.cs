using System;
namespace server
{
    public class CredentialSingleton 
    {
        private static CredentialSingleton credentialInstance;
        public string spotifyClientId { get; set; }
        public string spotifyClientSecret { get; set; }
        private CredentialSingleton()
        {
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
