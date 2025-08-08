import Select from "react-select";
import { CalenderComponent } from "@/components/CalenderComponent";
import { TimerPicker } from "@/components/TimerPicker";
import { DialogComponent } from "@/components/common/DialogComponent";
export default function AssignTestModal({
  isSelected,
  setIsSelected,
  handleSubmit,
  updateStatus,
  setForm,
  resetForm,
  questionOptions,
  animatedComponents,
  CustomValueContainer,
  errors,
  timeOptions,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedCandidate,
}) {
  return (
    <>
      {isSelected && (
        <DialogComponent
          description="Assign a test to the selected candidate. Choose the test type, set the interview date and time, and click Assign to send the test invitation."
          isOpen={isSelected}
          onClose={resetForm}
          cancelLabel="Cancel"
          submitLabel="Submit"
          onSubmit={async () => {
            const isProcessed = await handleSubmit();
            if (!isProcessed) return;
            await updateStatus(selectedCandidate.id);
            setIsSelected(false);
          }}
          children={
            <>
              <div className="flex flex-col gap-0.5">
                <Select
                  closeMenuOnSelect={false}
                  isMulti
                  options={questionOptions}
                  placeholder="Select Questions"
                  components={{
                    ...animatedComponents,
                    ValueContainer: CustomValueContainer,
                  }}
                  onChange={(selectedOptions) => {
                    setForm((prev) => ({
                      ...prev,
                      questionInput: selectedOptions.map(
                        (option) => option.value
                      ),
                    }));
                  }}
                />
                {errors.questionInput && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.questionInput}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-0.5">
                <Select
                  options={timeOptions}
                  placeholder="Select Time"
                  components={animatedComponents}
                  onChange={(selectedOption) => {
                    setForm((prev) => ({
                      ...prev,
                      timeInput: selectedOption.value,
                    }));
                  }}
                />
                {errors.timeInput && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.timeInput}
                  </p>
                )}
              </div>
              <CalenderComponent
                date={selectedDate}
                onDateChange={setSelectedDate}
              />
              <TimerPicker time={selectedTime} onTimeChange={setSelectedTime} />
            </>
          }
        />
      )}
    </>
  );
}
