import samplePDF from "./imm5818e.pdf";
export function getFeeds() {
  return [
    {
      id: 1,
      author: { nickname: "Godot", avatar: "https://i.pravatar.cc/150?img=2" },
      description:
        "Requirements of applying for a study permit in Canada: 1. Passport 2.  Offer letter 3. Study plan",
      file_url: samplePDF,
      file_size: "500 KB",
      created_at: "2023-08-08",
    },
    {
      id: 2,
      author: { nickname: "Mike", avatar: "https://i.pravatar.cc/150?img=3" },
      description:
        "Requirements of applying for a study permit in Canada: 1. Passport 2.  Offer letter 3. Study plan 4. Foobar",
      file_url: samplePDF,
      file_size: "500KB",
      created_at: "2023-08-08",
    },
  ];
}
