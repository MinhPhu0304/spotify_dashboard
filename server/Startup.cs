using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using SpotifyAPI.Web;
using static SpotifyAPI.Web.Scopes;


namespace server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string spotifyClientId = Configuration["spotify_client_id"];
            if (spotifyClientId == null)
            {
                spotifyClientId = Environment.GetEnvironmentVariable("spotify_client_id");
            }
            string spotifyClientSecret = Configuration["spotify_client_secret"];
            if (spotifyClientSecret == null)
            {
                spotifyClientSecret = Environment.GetEnvironmentVariable("spotify_client_secret");
            }
            CredentialSingleton credential = CredentialSingleton.getInstance();
            credential.spotifyClientId = spotifyClientId;
            credential.spotifyClientSecret = spotifyClientSecret;
            services.AddControllers();
            services.AddCors(o => o.AddPolicy("AllowAll", builder =>
            {
                builder.WithOrigins(new string[] { "https://spotify.minh.rocks", "http://localhost:3000" })
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowCredentials();
            }));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "server", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "server v1"));
            }
            app.UseCors("AllowAll");
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
