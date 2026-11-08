"use client";

import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-hot-toast";

import { sendOrder } from "@/lib/api/cars";
import { ErrorIcon } from "@/components/icons/icons";

import styles from "./BookingForm.module.css";

interface BookingFormProps {
  carId: string;
}

const bookingSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Please enter your name.")
    .min(2, "Name must contain at least 2 characters.")
    .matches(
      /^[\p{L}]+(?:[ '-][\p{L}]+)+$/u,
      "Please enter your first and last name.",
    ),

  email: yup
    .string()
    .trim()
    .required("Please enter your email.")
    .email("Please enter a valid email address."),

  comment: yup
    .string()
    .trim()
    .defined()
    .required("Comment is required.")
    .max(500, "Comment cannot exceed 500 characters."),
});

type BookingFormValues = yup.InferType<typeof bookingSchema>;

export default function BookingForm({ carId }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: BookingFormValues) =>
      sendOrder({
        id: carId,
        data: values,
      }),

    onSuccess: (response) => {
      toast.success(response.message);
      reset();
    },

    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const onSubmit = (values: BookingFormValues) => {
    mutate(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.heading}>
        <h2 className={styles.title}>Book your car now</h2>

        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.visuallyHidden} htmlFor="booking-name">
            Name
          </label>
          <div className={styles.inputWrapper}>
            <label
              htmlFor="booking-name"
              className={
                errors.name ? styles.errorLabel : styles.visuallyHidden
              }
            >
              Name*
            </label>

            <input
              id="booking-name"
              type="text"
              placeholder={errors.name ? "" : "Name*"}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "booking-name-error" : undefined}
              className={errors.name ? styles.invalidInput : styles.input}
              {...register("name")}
            />

            {errors.name && <ErrorIcon className={styles.errorIcon} />}
          </div>

          {errors.name && (
            <p id="booking-name-error" className={styles.errorMessage}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.visuallyHidden} htmlFor="booking-email">
            Email
          </label>

          <div className={styles.inputWrapper}>
            <label
              htmlFor="booking-email"
              className={
                errors.email ? styles.errorLabel : styles.visuallyHidden
              }
            >
              Email*
            </label>

            <input
              id="booking-email"
              type="email"
              placeholder={errors.email ? "" : "Email*"}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "booking-email-error" : undefined
              }
              className={errors.email ? styles.invalidInput : styles.input}
              {...register("email")}
            />

            {errors.email && <ErrorIcon className={styles.errorIcon} />}
          </div>

          {errors.email && (
            <p id="booking-email-error" className={styles.errorMessage}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.visuallyHidden} htmlFor="booking-comment">
            Comment
          </label>

          <div className={styles.inputWrapper}>
            <textarea
              id="booking-comment"
              placeholder="Comment"
              aria-invalid={Boolean(errors.comment)}
              aria-describedby={
                errors.comment ? "booking-comment-error" : undefined
              }
              className={
                errors.comment ? styles.invalidTextarea : styles.textarea
              }
              {...register("comment")}
            />

            {errors.comment && <ErrorIcon className={styles.errorIcon} />}
          </div>

          {errors.comment && (
            <p id="booking-comment-error" className={styles.errorMessage}>
              {errors.comment.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send"}

        {isPending && <span className={styles.spinner} />}
      </button>
    </form>
  );
}
