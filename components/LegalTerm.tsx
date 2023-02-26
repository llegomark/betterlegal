import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";

// Define the type of the `legalTerm` prop
export type LegalTermType =
  | "Actus Reus"
  | "Adjudication"
  | "Administrative Agency"
  | "Administrative Appeal"
  | "Adoption"
  | "Adverse Possession"
  | "Annulment"
  | "Arbitration"
  | "Arson"
  | "Asylum"
  | "Banking Regulation"
  | "Bankruptcy"
  | "Benefits"
  | "Bilateral Contract"
  | "Biodiversity Conservation"
  | "Breach of Contract"
  | "Child Custody"
  | "Child Support"
  | "Citizenship"
  | "Climate Change"
  | "Collateral"
  | "Collective Bargaining"
  | "Consideration"
  | "Constitutional Amendment"
  | "Constitutional Interpretation"
  | "Constructive Dismissal"
  | "Consumer Class Action"
  | "Consumer Credit"
  | "Consumer Fraud"
  | "Consumer Privacy"
  | "Consumer Protection Agency"
  | "Consumer Warranty"
  | "Copyright"
  | "Credit Line"
  | "Cybercrime"
  | "Damages"
  | "Deceptive Advertising"
  | "Defamation"
  | "Deportation"
  | "Domestic Violence"
  | "Drug Trafficking"
  | "Due Process"
  | "Easement"
  | "Employment Contract"
  | "Endangered Species"
  | "Environmental Regulation"
  | "Equal Protection"
  | "Estafa"
  | "Filiation"
  | "Free Speech"
  | "Homicide"
  | "Illegal Dismissal"
  | "Immigration Appeals"
  | "Immigration Court"
  | "Immigration Policy"
  | "Implied Contract"
  | "Injunction"
  | "Intellectual Property Infringement"
  | "Intellectual Property Litigation"
  | "Intentional Torts"
  | "Judicial Review"
  | "Kidnapping"
  | "Labor Arbitration"
  | "Labor Standards"
  | "Lease"
  | "Legal Separation"
  | "Liability"
  | "Licensing"
  | "Marriage"
  | "Mediation"
  | "Mens Rea"
  | "Mortgage"
  | "Murder"
  | "Natural Resource Management"
  | "Naturalization"
  | "Negligence"
  | "Negotiable Instrument"
  | "Nuisance"
  | "Offer and Acceptance"
  | "Ownership"
  | "Partition"
  | "Patent"
  | "Performance of Contract"
  | "Personal Injury"
  | "Personal Property"
  | "Pollution"
  | "Possession"
  | "Product Liability"
  | "Promissory Note"
  | "Property Relations"
  | "Psychological Incapacity"
  | "Quasi-Judicial"
  | "Quieting of Title"
  | "Rape"
  | "Real Property"
  | "Refugee Status"
  | "Religious Freedom"
  | "Resignation"
  | "Robbery"
  | "Rule-Making"
  | "Securities Law"
  | "Separation of Powers"
  | "Specific Performance"
  | "Strict Liability"
  | "Termination"
  | "Theft"
  | "Tort Reform"
  | "Trade Secret"
  | "Trademark"
  | "Trespass"
  | "Unilateral Contract"
  | "Visa"
  | "Wages"
  | "Waste Management";

// Define the props for the `LegalTermDropDown` component
interface LegalTermDropDownProps {
  legalTerm: LegalTermType;
  setLegalTerm: (legalTerm: LegalTermType) => void;
}

export const LegalTermDropDown: React.FC<LegalTermDropDownProps> = ({
  legalTerm,
  setLegalTerm,
}) => {
  const legalTerms: LegalTermType[] = [
    "Actus Reus",
    "Adjudication",
    "Administrative Agency",
    "Administrative Appeal",
    "Adoption",
    "Adverse Possession",
    "Annulment",
    "Arbitration",
    "Arson",
    "Asylum",
    "Banking Regulation",
    "Bankruptcy",
    "Benefits",
    "Bilateral Contract",
    "Biodiversity Conservation",
    "Breach of Contract",
    "Child Custody",
    "Child Support",
    "Citizenship",
    "Climate Change",
    "Collateral",
    "Collective Bargaining",
    "Consideration",
    "Constitutional Amendment",
    "Constitutional Interpretation",
    "Constructive Dismissal",
    "Consumer Class Action",
    "Consumer Credit",
    "Consumer Fraud",
    "Consumer Privacy",
    "Consumer Protection Agency",
    "Consumer Warranty",
    "Copyright",
    "Credit Line",
    "Cybercrime",
    "Damages",
    "Deceptive Advertising",
    "Defamation",
    "Deportation",
    "Domestic Violence",
    "Drug Trafficking",
    "Due Process",
    "Easement",
    "Employment Contract",
    "Endangered Species",
    "Environmental Regulation",
    "Equal Protection",
    "Estafa",
    "Filiation",
    "Free Speech",
    "Homicide",
    "Illegal Dismissal",
    "Immigration Appeals",
    "Immigration Court",
    "Immigration Policy",
    "Implied Contract",
    "Injunction",
    "Intellectual Property Infringement",
    "Intellectual Property Litigation",
    "Intentional Torts",
    "Judicial Review",
    "Kidnapping",
    "Labor Arbitration",
    "Labor Standards",
    "Lease",
    "Legal Separation",
    "Liability",
    "Licensing",
    "Marriage",
    "Mediation",
    "Mens Rea",
    "Mortgage",
    "Murder",
    "Natural Resource Management",
    "Naturalization",
    "Negligence",
    "Negotiable Instrument",
    "Nuisance",
    "Offer and Acceptance",
    "Ownership",
    "Partition",
    "Patent",
    "Performance of Contract",
    "Personal Injury",
    "Personal Property",
    "Pollution",
    "Possession",
    "Product Liability",
    "Promissory Note",
    "Property Relations",
    "Psychological Incapacity",
    "Quasi-Judicial",
    "Quieting of Title",
    "Rape",
    "Real Property",
    "Refugee Status",
    "Religious Freedom",
    "Resignation",
    "Robbery",
    "Rule-Making",
    "Securities Law",
    "Separation of Powers",
    "Specific Performance",
    "Strict Liability",
    "Termination",
    "Theft",
    "Tort Reform",
    "Trade Secret",
    "Trademark",
    "Trespass",
    "Unilateral Contract",
    "Visa",
    "Wages",
    "Waste Management",
  ];

  return (
    <Menu
      as="div"
      className="relative block w-full text-left"
      key={`legal-term-dropdown-${legalTerm}-${Math.random()}`}
    >
      <div>
        {/* The Menu.Button element renders the main button of the dropdown, which displays the currently selected legal term. */}
        <Menu.Button className="inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          {legalTerm}
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 hidden h-5 w-5 ui-open:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      {/* The Transition component handles the animation when the dropdown is opened and closed. */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {/* The Menu.Items element renders the list of selectable legal terms, which appears when the dropdown button is clicked. */}
        <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="h-32 overflow-y-scroll">
            {legalTerms.map((legalTermItem) => (
              // The Menu.Item element represents a selectable item in the list of legal terms.
              <Menu.Item key={legalTermItem}>
                {({ active }) => (
                  // The button inside the Menu.Item element displays the legal term and allows the user to select it.
                  <button
                    onClick={() => setLegalTerm(legalTermItem)}
                    className={`flex w-full items-center justify-between space-x-2 px-4 py-2 text-left text-sm ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } ${legalTerm === legalTermItem ? "bg-gray-200" : ""}`}
                  >
                    <span>{legalTermItem}</span>
                    {/* The CheckIcon component displays a checkmark next to the currently selected legal term. */}
                    {legalTerm === legalTermItem ? (
                      <CheckIcon className="text-bold h-4 w-4" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
