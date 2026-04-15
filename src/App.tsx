import { useState } from "react";
import { Professional, Appointment, ViewType } from "./types";
import THERAPIES from "./mocks/therapies";
import PROFESSIONALS from "./mocks/professionals.json";
import DATES from "./mocks/dates.json";
import TIMES from "./mocks/times.json";
import MOCK_APPOINTMENTS from "./mocks/appointments.json";
import AndroidStatusBar from "./components/AndroidStatusBar/AndroidStatusBar";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import ProfessionalProfileScreen from "./components/ProfessionalProfileScreen/ProfessionalProfileScreen";
import BookingScreen from "./components/BookingScreen/BookingScreen";
import SuccessScreen from "./components/SuccessScreen/SuccessScreen";
import DiscoverScreen from "./components/DiscoverScreen/DiscoverScreen";
import AppointmentsScreen from "./components/AppointmentsScreen/AppointmentsScreen";
import UserProfileScreen from "./components/UserProfileScreen/UserProfileScreen";
import AiMatchScreen from "./components/AiMatchScreen/AiMatchScreen";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import AppointmentDetailScreen from "./components/AppointmentDetailScreen/AppointmentDetailScreen";
import CancellationDoneScreen from "./components/CancellationDoneScreen/CancellationDoneScreen";
import EditProfileScreen from "./components/EditProfileScreen/EditProfileScreen";
import ProfileSavedScreen from "./components/ProfileSavedScreen/ProfileSavedScreen";

export default function App() {
  const [view, setView] = useState<ViewType>("splash");
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null);
  const [selectedTherapy, setSelectedTherapy] = useState<string | null>(null);

  // Booking state
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("13");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const navigateTo = (newView: string, data: Professional | null = null) => {
    if (data && newView === "profile") setSelectedPro(data);
    setView(newView as ViewType);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center sm:p-4">
      <div className="w-full h-[100dvh] sm:h-[850px] sm:w-[390px] bg-white sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative sm:border-[8px] border-gray-800">
        <AndroidStatusBar />

        {view === "splash" && (
          <SplashScreen onFinish={() => setView("login")} />
        )}
        {view === "login" && (
          <LoginScreen onLogin={() => setView("home")} />
        )}
        {view === "home" && (
          <HomeScreen
            therapies={THERAPIES}
            professionals={PROFESSIONALS}
            selectedTherapy={selectedTherapy}
            setSelectedTherapy={setSelectedTherapy}
            onNavigate={navigateTo}
          />
        )}
        {view === "discover" && (
          <DiscoverScreen
            professionals={PROFESSIONALS}
            onNavigate={navigateTo}
          />
        )}
        {view === "appointments" && (
          <AppointmentsScreen
            appointments={MOCK_APPOINTMENTS}
            professionals={PROFESSIONALS}
            onViewAppointment={(apt: Appointment) => {
              setSelectedAppointment(apt);
              setView("view-appointment");
            }}
          />
        )}
        {view === "view-appointment" && selectedAppointment && (() => {
          const pro = PROFESSIONALS.find((p) => p.id === selectedAppointment.proId);
          return pro ? (
            <AppointmentDetailScreen
              appointment={selectedAppointment}
              professional={pro}
              onBack={() => setView("appointments")}
              onCancelDone={() => setView("cancellation-done")}
            />
          ) : null;
        })()}
        {view === "cancellation-done" && selectedAppointment && (() => {
          const pro = PROFESSIONALS.find((p) => p.id === selectedAppointment.proId);
          return pro ? (
            <CancellationDoneScreen
              professional={pro}
              appointment={selectedAppointment}
              onGoHome={() => {
                setSelectedAppointment(null);
                setView("home");
              }}
            />
          ) : null;
        })()}
        {view === "user-profile" && <UserProfileScreen onEditProfile={() => setView("edit-profile")} />}
        {view === "edit-profile" && (
          <EditProfileScreen
            onBack={() => setView("user-profile")}
            onSave={() => setView("profile-saved")}
          />
        )}
        {view === "profile-saved" && (
          <ProfileSavedScreen onGoBack={() => setView("user-profile")} />
        )}
        {view === "ai-match" && (
          <AiMatchScreen
            professionals={PROFESSIONALS}
            therapies={THERAPIES}
            onBack={() => navigateTo("home")}
            onSelectPro={navigateTo}
          />
        )}
        {view === "profile" && selectedPro && (
          <ProfessionalProfileScreen
            professional={selectedPro}
            therapies={THERAPIES}
            onBack={() => navigateTo("home")}
            onBook={() => navigateTo("book")}
          />
        )}
        {view === "book" && selectedPro && (
          <BookingScreen
            professional={selectedPro}
            dates={DATES}
            times={TIMES}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            onBack={() => navigateTo("profile", selectedPro)}
            onConfirm={() => navigateTo("success")}
          />
        )}
        {view === "success" && selectedPro && (
          <SuccessScreen
            professional={selectedPro}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onGoHome={() => {
              setView("home");
              setSelectedTime(null);
            }}
          />
        )}

        {(["home", "discover", "appointments", "user-profile"] as ViewType[]).includes(view) && (
          <BottomNavigation view={view} setView={setView} />
        )}
      </div>
    </div>
  );
}
