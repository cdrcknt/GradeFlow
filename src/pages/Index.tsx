import GradeCalculator from "@/components/GradeCalculator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <GradeCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;