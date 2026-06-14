import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";
import heroImage from "@/assets/hero-mamadou.jpg";
import actionRally from "@/assets/action-rally.jpg";
import actionEducation from "@/assets/action-education.jpg";
import actionHealth from "@/assets/action-health.jpg";

const defaultImages: Record<string, string> = {
  "hero": heroImage,
  "action-rally": actionRally,
  "action-education": actionEducation,
  "action-health": actionHealth,
  "biographie": heroImage,
};

export const useImages = () => {
  const [images, setImages] = useState<Record<string, string>>(defaultImages);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/site-images`)
      .then(r => r.json())
      .then((data: any[]) => {
        if (Array.isArray(data)) {
          const map: Record<string, string> = { ...defaultImages };
          data.forEach(img => { if (img.cle && img.imageUrl) map[img.cle] = img.imageUrl; });
          setImages(map);
        }
      }).catch(() => {});
  }, []);

  return images;
};
