export default function Map({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div>
      <iframe
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`}
      ></iframe>
    </div>
  );
}
