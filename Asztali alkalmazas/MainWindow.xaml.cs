using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Newtonsoft.Json;
using System.Text.Json.Serialization;
using System.Collections.ObjectModel;

namespace MenhelyTerkepAdmin
{
	/// <summary>
	/// Interaction logic for MainWindow.xaml
	/// </summary>
	public partial class MainWindow : Window
	{
        private readonly HttpClient _httpClient = new HttpClient();
        private readonly string _apiUrl = Environment.GetEnvironmentVariable("API_URL") ?? "http://api.menhelyterkep.hu:3333";
        public MainWindow()
		{
			InitializeComponent();
        }

        private async void Login_Click(object sender, RoutedEventArgs e)
        {
            string username = UsernameTextBox.Text;
            string password = PasswordBox.Password;

            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                MessageTextBlock.Text = "Kérlek, töltsd ki az összes mezőt!";
                return;
            }

            bool isAuthenticated = await AuthenticateUserAsync(username, password);

            if (isAuthenticated)
            {
				AdminKezdolap ablak = new AdminKezdolap();
				ablak.Show();
				this.Close();
			}
            else
            {
                MessageTextBlock.Text = "Hibás felhasználónév vagy jelszó.";
            }
        }

        private async Task<bool> AuthenticateUserAsync(string username, string password)
        {
            var client = new HttpClient();
            var url = $"{_apiUrl}/admin/bejelentkezes";

            var loginData = new { felhasznalonev = username, jelszo = password };
            var json = JsonConvert.SerializeObject(loginData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                HttpResponseMessage response = await client.PostAsync(url, content);
                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt: " + ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }

            return false;
        }

    }

}
