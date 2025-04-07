const request = require('supertest');
const app = require('../app'); 

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