import { useParams } from "react-router";
import useDoFetch from "../../hooks/useDoFetch";
import { API_BASE_URL } from "../../constants/apiURL";
import LoadingIndicator from "../ui/LoadingIndicator";
import ErrorMessage from "../ui/ErrorMessage";
import { useFetchOptions } from "../../hooks/useFetchOptions";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Tabs } from "flowbite-react";
import UpdateProfileForm from "../UpdateProfileForm";
import { IoClose } from "react-icons/io5";
import UpcomingBookingsList from "../UpcomingBookingsList";
import PreviousBookingsList from "../PreviousBookingsList";
import ManagerVenuesList from "../ManagerVenuesList";

export default function ProfileDetails() {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [profile, setProfile] = useState(null);
  let name = useParams().name;
  const { getData } = useFetchOptions();

  const { data, isLoading, isError } = useDoFetch(`${API_BASE_URL}/profiles/${name}?_bookings=true&_venues=true`, getData());

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  console.log("profile", profile);

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
              <figure className="w-20 h-20">
                <img src={profile.avatar.url} alt={profile.name} className=" w-full h-full rounded-full object-cover object-center" />
              </figure>
              <button onClick={() => setIsEditProfileModalOpen(true)} className="text-sm underline underline-offset-2 hover:opacity-60">
                Edit profile
              </button>
            </div>

            <div className="flex flex-col gap-5">
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
                <Tabs.Item title="Venues">
                  <div>{data.venues.length > 0 ? <ManagerVenuesList venues={data.venues} /> : "You have no listed venues"}</div>
                </Tabs.Item>
              )}
            </Tabs>
          </section>
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
