import React, { useLayoutEffect, useRef, useState } from "react";
import { CalendarEvent } from "./CalendarDays";
import CustomModal from "./CustomModal";
import { format, formatDate } from "date-fns";

const OverflowContainer = ({ allDayEvents, nonAllDayEvents, date }) => {
  const containerRef = useRef();
  const [overflowAmount, setOverflowAmount] = useState(0);
  const [viewMoreModalOpen, setViewMoreModalOpen] = useState(false);

  useLayoutEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const containerElement = entries[0]?.target;
      if (containerElement == null) return;
      const children = containerElement.querySelectorAll("[data-item]");
      const overflowElement =
        containerElement.parentElement?.querySelector("[data-overflow]");

      if (overflowElement != null) overflowElement.style.display = "none";
      children.forEach((child) => child.style.removeProperty("display"));
      let amount = 0;
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        if (containerElement.scrollHeight <= containerElement.clientHeight) {
          break;
        }
        amount = children.length - i;
        child.style.display = "none";
        overflowElement?.style.removeProperty("display");
      }
      setOverflowAmount(amount);
    });

    observer.observe(containerRef.current);
  }, []);

  return (
    <>
      <div className="events" ref={containerRef}>
        {allDayEvents.map((event) => {
          return (
            <div data-item key={event.id}>
              <CalendarEvent key={event.id} allDay={true} event={event} />
            </div>
          );
        })}
        {nonAllDayEvents.map((event) => {
          return (
            <div data-item key={event.id}>
              <CalendarEvent key={event.id} allDay={false} event={event} />
            </div>
          );
        })}
      </div>
      <div data-overflow>
        <>
          <button
            className="events-view-more-btn"
            onClick={() => setViewMoreModalOpen(true)}
          >
            +{overflowAmount} More
          </button>
        </>
        <ViewMoreCalendarEventsModal
          allDayEvents={allDayEvents}
          nonAllDayEvents={nonAllDayEvents}
          isOpen={viewMoreModalOpen}
          date={date}
          onClose={() => setViewMoreModalOpen(false)}
        />
      </div>
    </>
  );
};

function ViewMoreCalendarEventsModal({
  allDayEvents,
  nonAllDayEvents,
  date,
  isOpen,
  onClose,
}) {
  return (
    <CustomModal
      openEventModal={isOpen}
      handleCloseEventForm={onClose}
      title={`${format(date, "LL/dd/yy")}`}
    >
      <div className="events">
        {allDayEvents.map((event) => {
          return (
            <div data-item key={event.id}>
              <CalendarEvent key={event.id} allDay={true} event={event} />
            </div>
          );
        })}
        {nonAllDayEvents.map((event) => {
          return (
            <div data-item key={event.id}>
              <CalendarEvent key={event.id} allDay={false} event={event} />
            </div>
          );
        })}
      </div>
    </CustomModal>
  );
}

export default OverflowContainer;
