export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const cors = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      }
    }

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors.headers })

    const key = 'seascape_data'

    async function getData() {
      try { return JSON.parse(await env.seascape_kv.get(key)) || { coupons: [], bookings: [] } }
      catch { return { coupons: [], bookings: [] } }
    }

    async function saveData(data) {
      await env.seascape_kv.put(key, JSON.stringify(data))
    }

    try {
      // GET /api/coupons
      if (url.pathname === '/api/coupons' && request.method === 'GET') {
        const data = await getData()
        return new Response(JSON.stringify(data.coupons), cors.headers)
      }

      // POST /api/coupons
      if (url.pathname === '/api/coupons' && request.method === 'POST') {
        const body = await request.json()
        const data = await getData()
        if (data.coupons.find(c => c.code === body.code)) {
          return new Response(JSON.stringify({ error: 'Ce code existe déjà' }), { status: 400, headers: cors.headers })
        }
        data.coupons.push({ code: body.code, type: body.type, value: body.value, active: true })
        await saveData(data)
        return new Response(JSON.stringify(data.coupons), cors.headers)
      }

      // DELETE /api/coupons/:code
      if (url.pathname.startsWith('/api/coupons/') && request.method === 'DELETE') {
        const code = url.pathname.split('/').pop()
        const data = await getData()
        data.coupons = data.coupons.filter(c => c.code !== code)
        data.bookings = data.bookings.filter(b => b.couponCode !== code)
        await saveData(data)
        return new Response(JSON.stringify(data.coupons), cors.headers)
      }

      // PUT /api/coupons/:code/toggle
      if (url.pathname.endsWith('/toggle') && request.method === 'PUT') {
        const code = url.pathname.split('/')[3]
        const data = await getData()
        data.coupons = data.coupons.map(c => c.code === code ? { ...c, active: !c.active } : c)
        await saveData(data)
        return new Response(JSON.stringify(data.coupons), cors.headers)
      }

      // POST /api/bookings
      if (url.pathname === '/api/bookings' && request.method === 'POST') {
        const body = await request.json()
        const data = await getData()
        data.bookings.push({ ...body, timestamp: new Date().toISOString() })
        await saveData(data)
        return new Response(JSON.stringify({ ok: true }), cors.headers)
      }

      // GET /api/bookings
      if (url.pathname === '/api/bookings' && request.method === 'GET') {
        const data = await getData()
        return new Response(JSON.stringify(data.bookings), cors.headers)
      }

      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: cors.headers })
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: cors.headers })
    }
  }
}
