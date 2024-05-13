export default function checkIfUserIsOwner(owner, user) {
  if (owner && user) {
    const venueManager = owner.name;
    const currentUser = user.name;
    return venueManager === currentUser;
  }
}
