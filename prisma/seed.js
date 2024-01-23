import { PrismaClient } from '@prisma/client'
import bookData from '../data/books.json' assert { type: 'json' }
import userData from '../data/users.json' assert { type: 'json' }
import orderData from '../data/orders.json' assert { type: 'json' }
import recordData from '../data/records.json' assert { type: 'json' }



const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })


async function main() {
    const { books } = bookData
    const { users } = userData
    const { orders } = orderData
    const { records } = recordData


    for (const book of books) {
        console.log('Upserting book:', book);
        await prisma.book.upsert({
            where: { id: book.id },
            update: book,
            create: book
        })
    }

    for (const record of records) {
        await prisma.record.upsert({
            where: { id: record.id },
            update: record,
            create: record
        })
    }

    for (const user of users) {
        await prisma.user.upsert({
            where: { id: user.id },
            update: user,
            create: user
        })
    }

    for (const order of orders) {
        await prisma.order.upsert({
            where: { id: order.id },
            update: order,
            create: {
                ...order,
                books: {
                    connect: order.book_ids.map((book) => ({ id: book.id }))
                }
            }
        })
    }


    main()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
}

console.log(recordData)