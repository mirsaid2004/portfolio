export default function TestErrorPage() {
  // This page intentionally throws an error to test the error boundary
  throw new Error("This is a test error to verify the 500 page UI.");
}
