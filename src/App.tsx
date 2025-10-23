import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { Dashboard } from "./components/Dashboard";
import { ApplicationLanding } from "./components/ApplicationLanding";
import { FamousSpeeches } from "./components/FamousSpeeches";
import { AcademicSamples } from "./components/AcademicSamples";
import { MyLessons } from "./components/MyLessons";
import { CustomContent } from "./components/CustomContent";
import { ChatWithAI } from "./components/ChatWithAI";
import { IELTSModule } from "./components/IELTSModule";
import { Profile } from "./components/Profile";
import { ThemeProvider } from "./components/ThemeProvider";

type View =
  | "home"
  | "about"
  | "contact"
  | "login"
  | "signup"
  | "forgot-password"
  | "dashboard"
  | "application"
  | "famous-speeches"
  | "academic-samples"
  | "my-lessons"
  | "custom-content"
  | "chat"
  | "ielts"
  | "profile";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");

  const handleNavigate = (view: string) => {
    setCurrentView(view as View);
  };

  const handleLogin = () => {
    setCurrentView("dashboard");
  };

  const handleSignUp = () => {
    // After successful signup, go to dashboard
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setCurrentView("home");
  };

  const handleModuleClick = (moduleId: string) => {
    setCurrentView(moduleId as View);
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  const handleBackToApplication = () => {
    setCurrentView("application");
  };

  const handleApplicationModuleSelect = (module: string) => {
    setCurrentView(module as View);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage onBack={handleBackToHome} />;
      case "contact":
        return <ContactPage onBack={handleBackToHome} />;
      case "login":
        return <LoginPage onLogin={handleLogin} />;
      case "signup":
        return <SignUpPage onBack={handleBackToHome} onSignUp={handleSignUp} />;
      case "forgot-password":
        return <ForgotPasswordPage onBack={() => setCurrentView("login")} />;
      case "dashboard":
        return (
          <Dashboard
            onLogout={handleLogout}
            onModuleClick={handleModuleClick}
          />
        );
      case "application":
        return (
          <ApplicationLanding
            onBack={handleBackToDashboard}
            onModuleSelect={handleApplicationModuleSelect}
            onLogout={handleLogout}
          />
        );
      case "famous-speeches":
        return (
          <FamousSpeeches onBack={handleBackToDashboard} />
        );
      case "academic-samples":
        return (
          <AcademicSamples onBack={handleBackToApplication} />
        );
      case "my-lessons":
        return <MyLessons onBack={handleBackToDashboard} />;
      case "custom-content":
        return <CustomContent onBack={handleBackToDashboard} />;
      case "chat":
        return <ChatWithAI onBack={handleBackToApplication} />;
      case "ielts":
        return <IELTSModule onBack={handleBackToApplication} />;
      case "profile":
        return <Profile onBack={handleBackToDashboard} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="size-full">{renderCurrentView()}</div>
    </ThemeProvider>
  );
}