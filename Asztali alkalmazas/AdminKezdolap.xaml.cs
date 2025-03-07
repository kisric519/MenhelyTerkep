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
using static MenhelyTerkepAdmin.MainWindow;

namespace MenhelyTerkepAdmin
{
	/// <summary>
	/// Interaction logic for AdminKezdolap.xaml
	/// </summary>
	public partial class AdminKezdolap : Window
	{
		private readonly HttpClient _httpClient = new HttpClient();
		private readonly string _apiUrl = Environment.GetEnvironmentVariable("API_URL") ?? "http://api.menhelyterkep.hu:3333";
		public AdminKezdolap()
		{
			InitializeComponent();
			MenhelyekBetoltese();
			JovahagyottMenhelyekBetoltese();
		}

		//Fő content
		private async void MenhelyekBetoltese()
		{
			try
			{
				HttpResponseMessage response = await _httpClient.GetAsync($"{_apiUrl}/admin/jovahagyatlanok");

				if (response.IsSuccessStatusCode)
				{
					string responseBody = await response.Content.ReadAsStringAsync();

					List<Shelter> shelterList = JsonConvert.DeserializeObject<List<Shelter>>(responseBody);

					ObservableCollection<Shelter> shelters = new ObservableCollection<Shelter>(shelterList);
					shelterListView.ItemsSource = shelters;
				}
				else
				{
					MessageBox.Show("Nem sikerült lekérni az adatokat.");
				}
			}
			catch (Exception ex)
			{
				MessageBox.Show($"Hiba történt: {ex.Message}");
			}
		}

		private async void JovahagyottMenhelyekBetoltese()
		{
			try
			{
				HttpResponseMessage response = await _httpClient.GetAsync($"{_apiUrl}/menhelyek/jovahagyott");

				if (response.IsSuccessStatusCode)
				{
					string responseBody = await response.Content.ReadAsStringAsync();

					List<Shelter> shelterList = JsonConvert.DeserializeObject<List<Shelter>>(responseBody);

					ObservableCollection<Shelter> shelters = new ObservableCollection<Shelter>(shelterList);
					aktivShelterListView.ItemsSource = shelters;
				}
				else
				{
					MessageBox.Show("Nem sikerült lekérni az adatokat.");
				}
			}
			catch (Exception ex)
			{
				MessageBox.Show($"Hiba történt: {ex.Message}");
			}
		}


		private async void Jovahagyas_Click(object sender, RoutedEventArgs e)
		{
			var button = sender as Button;
			string shelterId = button?.Tag as string;

			if (!string.IsNullOrEmpty(shelterId))
			{
				await SendPutRequestAsync($"{_apiUrl}/admin/menhelyek/jovahagy/" + shelterId);
			}
		}

		private async void Torles_Click(object sender, RoutedEventArgs e)
		{
			var button = sender as Button;
			string shelterId = button?.Tag as string;

			if (!string.IsNullOrEmpty(shelterId))
			{
				await SendDelRequestAsync($"{_apiUrl}/admin/menhelyek/torles/" + shelterId);
			}
		}


		private async Task SendPutRequestAsync(string endpoint)
		{

			HttpResponseMessage response = await _httpClient.PutAsync(endpoint, new StringContent("{}", Encoding.UTF8, "application/json"));
			if (response.IsSuccessStatusCode)
			{
				MenhelyekBetoltese();
			}
			else
			{
				MessageBox.Show("Hiba történt a művelet során.");
			}
		}

		private async Task SendDelRequestAsync(string endpoint)
		{

			HttpResponseMessage response = await _httpClient.DeleteAsync(endpoint);
			if (response.IsSuccessStatusCode)
			{
				MenhelyekBetoltese();
			}
			else
			{
				MessageBox.Show("Hiba történt a művelet során.");
			}
		}

		private void Ujratoltes(object sender, RoutedEventArgs e)
		{
			MenhelyekBetoltese();
			JovahagyottMenhelyekBetoltese();
		}


		public class Shelter
		{
			[JsonPropertyName("id")]
			public string Id { get; set; }

			[JsonPropertyName("menhelyneve")]
			public string MenhelyNeve { get; set; }

			[JsonPropertyName("email")]
			public string Email { get; set; }

			[JsonPropertyName("telefonszam")]
			public string Telefonszam { get; set; }

			[JsonPropertyName("jelszo")]
			public string Jelszo { get; set; }

			[JsonPropertyName("menhelycime")]
			public string MenhelyCime { get; set; }

			[JsonPropertyName("oldallink")]
			public string OldalLink { get; set; }

			[JsonPropertyName("leiras")]
			public string Leiras { get; set; }

			[JsonPropertyName("jovahagyva")]
			public bool Jovahagyva { get; set; }
		}

	}
}
