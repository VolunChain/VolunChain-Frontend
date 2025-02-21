import DashboardNav from "@/components/dashboard/DashboardNav";
import AccountInformation from "@/components/account-information/accountInformation";

const AccountPage = () => {
  return (
    <div className="p-6 mt-20">
      <DashboardNav />
      <AccountInformation />
    </div>
  );
};

export default AccountPage;
