import { PrismaClient } from "@prisma/client";

const deleteBook = async (id) => {
    const prisma = new PrismaClient()

    const deletedBook = await prisma.book.deleteMany({
        where: {
            id
        }
    })

    if (!deletedBook || deletedBook.count === 0) {
        throw new NotFoundError("Book", id)
    }
    return id
}

export default deleteBook


// import bookData from '../../data/books.json' assert { type: 'json' };

// const deleteBook = (id) => {
//     const index = bookData.books.findIndex((book) => book.id === id);

//     if (index === -1) {
//         throw new NotFoundError('Book', id);
//     }

//     bookData.books.splice(index, 1);
//     return id;
// };

// export default deleteBook;