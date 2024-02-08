import ModelPhone from "@/components/ModelPhone"
import SessionCheck from "@/components/SessionCheck"

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return(
        <main>
            <SessionCheck>
              <ModelPhone/>
              {children}
            </SessionCheck>
        </main>
    )
  }