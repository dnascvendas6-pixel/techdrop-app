export const metadata = {
  title: 'TechDrop App',
  description: 'Aplicação TechDrop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
