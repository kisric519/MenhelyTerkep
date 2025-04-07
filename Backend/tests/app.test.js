const request = require('supertest');
const app = require('../app'); 
const Felhasznalok = require('../models/felhasznalok-model'); 
const mongoose = require('mongoose');

describe('GET /admin/jovahagyatlanok', () => {
  it('visszaadja a nem jóváhagyott menhelyeket', async () => {
    const response = await request(app).get('/admin/jovahagyatlanok');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    // Ellenőrzés: minden menhelyre igaz, hogy nincs jóváhagyva
    response.body.forEach(menhely => {
        expect(menhely.jovahagyva).toBe(false);
    });

    // Opcionális: van legalább 1 elem (hogy ne üres legyen)
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('POST /users/regisztracio', () => {
  // Teszt után adatbázis visszaállítása
  afterAll(async () => {
    await Felhasznalok.deleteMany({ email: 'elek@teszt.com' });
    await mongoose.disconnect();
  });

  it('sikeresen létrehoz egy új felhasználót', async () => {
    const ujFelhasznalo = {
      nev: 'Teszt Elek',
      email: 'elek@teszt.com',
      telefonszam: '06203334455',
      jelszo: 'Tesztjelszo123'
    };

    const response = await request(app)
      .post('/users/regisztracio')
      .send(ujFelhasznalo);

    expect(response.status).toBe(200);
    expect(response.body.nev).toBe('Teszt Elek');
    expect(response.body.email).toBe('elek@teszt.com');
    expect(response.body.jelszo).not.toBe('Tesztjelszo123');
  });
});