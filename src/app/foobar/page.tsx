'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

function isPrime(n: number): boolean {
    if (n < 2) return false
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false
    }
    return true
}

function processNumber(n: number): string | number {
    if (isPrime(n)) return ''
    if (n % 15 === 0) return 'FooBar'
    if (n % 3 === 0) return 'Foo'
    if (n % 5 === 0) return 'Bar'
    return n
}

export default function FooBarPage() {
    const [result, setResult] = useState<(string | number)[]>([])

    useEffect(() => {
        const output: (string | number)[] = []
        for (let i = 100; i >= 1; i--) {
            const processed = processNumber(i)
            if (processed !== '') output.push(processed)
        }
        setResult(output)
    }, [])

    const getClassName = (item: string | number) => {
        if (item === 'FooBar') return 'text-purple-600 font-bold'
        if (item === 'Foo') return 'text-blue-600 font-bold'
        if (item === 'Bar') return 'text-green-600 font-bold'
        return 'text-gray-800'
    }

    return (
        <div className="p-6 max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">FooBar Challenge</h1>
            <p className="mb-4 text-gray-600">
                Menampilkan angka dari 100 ke 1 secara horizontal dengan aturan:
                tidak menampilkan bilangan prima dan mengganti angka tertentu dengan{' '}
                <strong>Foo</strong>, <strong>Bar</strong>, atau <strong>FooBar</strong>.
            </p>
            <div className="p-4 border rounded shadow text-wrap text-sm leading-6 bg-gray-50">
                {result.map((item, index) => (
                    <span key={index} className={getClassName(item)}>
                     {item}{index !== result.length - 1 && ', '}
                    </span>
                ))}
            </div>

            <Link
                href="/"
                className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
            >
                ← Kembali ke Home
            </Link>
        </div>
    )
}
