import { useState } from "react";

type Props = {
  postData?: unknown;
  task: "edit" | "create";
};

export default function PostForm({ postData, task }: Props) {
  const [formData, setFormData] = useState({
    title: postData.title || "",
    type: postData.title || "",
    width: postData.title || "",
    height: postData.height || "",
    images: postData.images || [],
    price: postData.price || "",
    salePrice: postData.salePrice || "",
    qty: postData.qty || 0,
    color: postData.color || "",
  });
  return <form className="form"></form>;
}
