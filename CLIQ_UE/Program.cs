using CLIQ_UE.Models;
using CLIQ_UE.Services;
using Microsoft.EntityFrameworkCore;

namespace CLIQ_UE
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.
			builder.Services.AddControllersWithViews();
			//Add Service DbContext
			builder.Services.AddDbContext<ApplicationContext>(options =>
			{
				options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString"));
			});
			//Add Service Identity
			builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(
							option =>
							{
								//setting of Password
								option.Password.RequireNonAlphanumeric = false;
								option.Password.RequireDigit = true;
								option.Password.RequiredLength = 6;
							}).AddEntityFrameworkStores<ApplicationContext>();

			//register My Services
			builder.Services.AddScoped<IUserServices, UserServices>();


			var app = builder.Build();


			// Configure the HTTP request pipeline.
			if (!app.Environment.IsDevelopment())
			{
				app.UseExceptionHandler("/Home/Error");
			}
			app.UseStaticFiles();

			app.UseRouting();

			//app.UseAuthentication();
			app.UseAuthorization();

			app.MapControllerRoute(
				name: "default",
				pattern: "{controller=Home}/{action=Index}/{id?}");

			app.Run();
		}
	}
}
