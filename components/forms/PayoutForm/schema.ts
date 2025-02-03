import { z } from "zod";

export const createPayoutFormSchema = (totalBalance: number) => {
  return z.object({
    recipientId: z.string().nonempty("Recipient ID is required"),
    amount: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z
        .number()
        .min(0.01, "Amount must be greater than 0")
        .max(totalBalance || 0, `Amount cannot exceed your balance of ${totalBalance}`)
    ),
    note: z.string().optional(),
  });
};
