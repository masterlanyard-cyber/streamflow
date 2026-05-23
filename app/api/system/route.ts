export async function GET() {

  try {

    const res = await fetch(
      'http://164.68.98.73:3000/api/system'
    )

    const data = await res.json()

    return Response.json(data)

  } catch(err) {

    return Response.json({
      cpu:'0',
      ram:'0',
      status:'offline'
    })

  }

}
