import { useParams } from "react-router";
import useDoFetch from "../../hooks/useDoFetch";
import { API_BASE_URL } from "../../constants/apiURL";
import LoadingIndicator from "../ui/LoadingIndicator";
import ErrorMessage from "../ui/ErrorMessage";
import { useFetchOptions } from "../../hooks/useFetchOptions";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Tabs } from "flowbite-react";
import UpdateProfileForm from "../forms/UpdateProfileForm";
import { IoClose } from "react-icons/io5";
import UpcomingBookingsList from "../UpcomingBookingsList";
import PreviousBookingsList from "../PreviousBookingsList";
import ManagerVenuesList from "../ManagerVenuesList";
import { Link } from "react-router-dom";
import useAuth from "../../store/auth";
import checkIfProfileIsUsersProfile from "../../utils/checkIfProfileIsUsersProfile";

export default function ProfileDetails() {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isProfileUsersProfile, setIsProfileUsersProfile] = useState(false);
  const { getData } = useFetchOptions();
  const { user } = useAuth();
  let name = useParams().name;

  const { data, isLoading, isError } = useDoFetch(`${API_BASE_URL}/profiles/${name}?_bookings=true&_venues=true`, getData());

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  useEffect(() => {
    if (profile && user) {
      setIsProfileUsersProfile(checkIfProfileIsUsersProfile(profile, user));
    }
  }, [profile, user]);

  useEffect(() => {
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    if (profile && !isLoading && !isError) {
      document.title = `${profile.name} | Profile | Holidaze`;
      metaDescription.setAttribute("content", `View ${profile.name}'s profile at Holidaze`);
    } else if (isError) {
      document.title = "Profile not found | Profile | Holidaze";
      metaDescription.setAttribute("content", "Unfortunately we can not find this profile at Holidaze");
    }
  }, [profile, isLoading, isError]);

  const handleProfileUpdate = (updatedProfile) => {
    setIsEditProfileModalOpen(false);
    setProfile(updatedProfile);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError || !profile) {
    return <ErrorMessage message="Oooops! We could not find this profile, please try again." />;
  }

  if (profile && profile.avatar) {
    return (
      <>
        <div className="flex flex-col gap-12 justify-center items-center ">
          <section className="flex items-center gap-5 md:gap-10 w-full">
            <div className="flex flex-col">
              <figure className="w-28 h-28">
                <img src={profile.avatar.url} alt={user.avatar.alt || user.name} className=" w-full h-full rounded-full object-cover object-center" />
              </figure>
              {isProfileUsersProfile && (
                <button onClick={() => setIsEditProfileModalOpen(true)} className="text-sm underline underline-offset-2 link font-normal">
                  Edit profile
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-xl md:text-3xl">{data.name}</h1>

              <div className="w-max">
                {profile.venueManager && (
                  <div className="flex items-center justify-between gap-5">
                    <h3 className="text-base">Venues:</h3>
                    <span className="text-text">{data._count.venues}</span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-5">
                  <h3 className="text-base">Bookings:</h3>
                  <span className="text-text">{data._count.bookings}</span>
                </div>
              </div>
            </div>
          </section>

          {isProfileUsersProfile ? (
            <section className="w-full">
              <Tabs style="default" className="flex-nowrap">
                <Tabs.Item active title="Upcoming bookings">
                  <div>
                    <UpcomingBookingsList bookings={data.bookings} />
                  </div>
                </Tabs.Item>

                <Tabs.Item title="Previous bookings">
                  <div>
                    <PreviousBookingsList bookings={data.bookings} />
                  </div>
                </Tabs.Item>

                {profile.venueManager && (
                  <Tabs.Item title="My venues">
                    <section className="">{data.venues.length > 0 ? <ManagerVenuesList venues={data.venues} /> : <div className="mb-5">You have no listed venues</div>}</section>

                    <Link to="/venues/add" className="btn btn-primary w-max">
                      Add venue
                    </Link>
                  </Tabs.Item>
                )}
              </Tabs>
            </section>
          ) : (
            <section className="flex flex-col gap-2 w-full">
              <h2 className="text-lg md:text-2xl">{data.name}'s venues</h2>
              {data.venues.length > 0 ? <ManagerVenuesList venues={data.venues} /> : "This venue manager has no venues listed."}
            </section>
          )}
        </div>

        <Modal dismissible size="md" show={isEditProfileModalOpen} onClose={() => setIsEditProfileModalOpen(false)}>
          <ModalHeader className="p-3 border-none" />
          <ModalBody className="pt-0">
            <div className="flex flex-col gap-5">
              <h3 className="text-xl">Edit profile</h3>
              <UpdateProfileForm profile={profile} onSuccess={handleProfileUpdate} />
            </div>
          </ModalBody>
        </Modal>

        {showToast && (
          <div id="toast" className="flex bg-green-50 text-green-800 items-center m-4 p-5 border border-green-800 rounded-lg shadow fixed z-50 top-0 right-0" role="alert">
            <div className="text-lg">Your profile has been updated!</div>

            <button onClick={() => setShowToast(false)} type="button" className="ms-5 hover:bg-green-800 hover:text-green-50 rounded-full p-1" aria-label="Close">
              <IoClose size={20} />
            </button>
          </div>
        )}
      </>
    );
  }

  return <LoadingIndicator />;
}
