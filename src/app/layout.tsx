import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryClientProviderCustom from '@/providers/QueryClientProvider';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Next Immo',
	description: 'Real Estate Manager',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<QueryClientProviderCustom>
				<body className={inter.className}>
					<Navbar />
					{children}

					<Toaster />
				</body>
			</QueryClientProviderCustom>
		</html>
	);
}
