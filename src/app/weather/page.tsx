'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Forecast = {
    date: string
    temp: number
    description: string
}

export default function WeatherPage() {
    const [forecast, setForecast] = useState<Forecast[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=Jakarta&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
                )
                const data = await response.json()

                if (!data.list) {
                    throw new Error('Data tidak tersedia')
                }

                const filtered = data.list.filter((item: any) =>
                    item.dt_txt.includes('12:00:00')
                )

                const dailyForecast: Forecast[] = filtered.slice(0, 5).map((item: any) => ({
                    date: item.dt_txt.split(' ')[0],
                    temp: item.main.temp,
                    description: item.weather[0].description,
                }))

                setForecast(dailyForecast)
            } catch (err: any) {
                setError(err.message || 'Terjadi kesalahan')
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()
    }, [])

    if (loading) return <p className="text-center mt-10">Loading...</p>
    if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>

    return (
        <div className="p-6 max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Cuaca Jakarta</h1>
            <p className="text-gray-600 mb-6">Data cuaca diambil dari OpenWeatherMap API.</p>
            <ul className="space-y-3 mb-6">
                {forecast.map((day, index) => (
                    <li
                        key={index}
                        className="p-4 border rounded shadow bg-white text-left"
                    >
                        <strong>{day.date}</strong>: {day.temp}°C, {day.description}
                    </li>
                ))}
            </ul>

            <Link
                href="/"
                className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
            >
                ← Kembali ke Home
            </Link>
        </div>
    )
}
