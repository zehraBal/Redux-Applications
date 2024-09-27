import Footer from "./Footer";
import Header from "./Header";
import ToDoSection from "./ToDoSection";

export default function ToDo() {
  return (
    <div className="app">
      <div className="todoApp">
        <Header />
        <ToDoSection />
        <Footer />
      </div>
    </div>
  );
}
