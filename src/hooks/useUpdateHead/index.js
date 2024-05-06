import { useEffect } from "react";

export default function useUpdateHead(title, contentDescription) {
  useEffect(() => {
    document.title = `${title} | Holidaze`;

    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", contentDescription);
  }, [title, contentDescription]);
}
