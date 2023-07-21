import { prisma } from "../src/app/lib/prisma";

async function main (){
    await prisma.products.createMany({
        data: [
            {
               name: 'Mackbook',
               description: 'Galaxy Tab S6 Lite 10.4-inch Android Tablet 128GB.',
               category: 'notebook',
               badge: 'Lancamento',
               image: 'https://images.unsplash.com/photo-1532198528077-0d9e4ca9bb40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1447&q=80',
               price: 10.000,
            },

            {
                name: 'Fone de ouvido',
                description: 'Galaxy Tab S6 Lite 10.4-inch Android Tablet 128GB.',
                category: 'Fone',
                badge: 'Lancamento',
                image: 'https://images.unsplash.com/photo-1600086827875-a63b01f1335c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
                price: 500,
             },

             {
                name: 'Iphone 6',
                description: 'Galaxy Tab S6 Lite 10.4-inch Android Tablet 128GB.',
                category: 'Iphone',
                badge: 'Oferta',
                image: 'https://images.unsplash.com/photo-1571380401583-72ca84994796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80',
                price: 5.000,
             },
             {
                name: 'Console Sony Playstation 4',
                description: 'Galaxy Tab S6 Lite 10.4-inch Android Tablet 128GB.',
                category: 'Vídeo Game',
                badge: 'Oferta',
                image: 'https://images.unsplash.com/photo-1581591546163-a6e9bf7ce12d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
                price: 5.000,
             },
             {
                name: 'Smartwatch',
                description: 'Galaxy Tab S6 Lite 10.4-inch Android Tablet 128GB.',
                category: 'Relogio',
                badge: 'Oferta',
                image: 'https://images.unsplash.com/photo-1617625802912-cde586faf331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80',
                price: 200,
             }
        ]
    })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

