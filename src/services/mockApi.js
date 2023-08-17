import samplePDF from "./imm5818e.pdf";

export function getUser() {
  return {
    username: "Godot",
    nickname: "Godot",
    email: "xugodot@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus ultricies. Sed vel aliquet libero. Nunc a augue fermentum, pharetra ligula sed, aliquam lacus.",
  };
}
export function getFeeds() {
  return [
    {
      id: 1,
      author: {
        id: 1,
        nickname: "Godot",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      description:
        "Requirements of applying for a study permit in Canada: 1. Passport 2.  Offer letter 3. Study plan",
      file_url: samplePDF,
      file_size: "500 KB",
      created_at: "2023-08-08",
    },
    {
      id: 2,
      author: {
        id: 2,
        nickname: "Mike",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      description:
        "Requirements of applying for a study permit in Canada: 1. Passport 2.  Offer letter 3. Study plan 4. Foobar",
      file_url: samplePDF,
      file_size: "500KB",
      created_at: "2023-08-08",
    },
  ];
}

export function getUserPosts() {
  return [
    {
      id: 1,
      author: {
        id: 1,
        nickname: "Godot",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      description: "Loo",
      file_url: samplePDF,
      file_size: "500 KB",
      created_at: "2023-08-08",
    },
    {
      id: 2,
      author: {
        id: 2,
        nickname: "Mike",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      description:
        "Requirements of applying for a study permit in Canada: 1. Passport 2.  Offer letter 3. Study plan 4. Foobar",
      file_url: samplePDF,
      file_size: "500KB",
      created_at: "2023-08-08",
    },
  ];
}
