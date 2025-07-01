import AccountNav from "@/components/Account/AccountNav";

export default function AccountLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto px-4 py-6 max-w-6xl">
            <h1 className="text-2xl font-bold mb-6">My Account</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    {/* The navigation is part of the layout */}
                    <AccountNav />
                </div>

                <div className="md:col-span-3">
                    {/* The specific page (e.g., profile, orders) will be rendered here */}
                    {children}
                </div>
            </div>
        </div>
    );
}