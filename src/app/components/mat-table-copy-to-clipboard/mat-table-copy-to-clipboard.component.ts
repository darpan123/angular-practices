import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
  selector: 'app-mat-table-copy-to-clipboard',
  templateUrl: './mat-table-copy-to-clipboard.component.html',
  styleUrls: ['./mat-table-copy-to-clipboard.component.scss'],
  // imports:[MatTableModule],
  standalone: false,
})
export class MatTableCopyToClipboardComponent {
  currentDate = new Date();
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'weight',
    'symbol',
  ];
  displayedUserColumns: string[] = [
    'select',
    'id',
    'name',
    'completedClaims',
    'supervisorId',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  userViewDataSource = new MatTableDataSource<UserElement>(USERVIEW_DATA);
  faCopy = faCopy;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.userViewDataSource.paginator = this.paginator;
    this.userViewDataSource.sort = this.sort;
  }

  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
]

export interface UserElement {
  id: number;
  name: string;
  completedClaims: number;
  supervisorId: string;
}
const USERVIEW_DATA: UserElement[] = [
  { id: 1, name: 'Darpan Meher', completedClaims: 12, supervisorId: 'H' },
  { id: 2, name: 'Chaitra tc', completedClaims: 32, supervisorId: 'He' },
  { id: 3, name: 'Mohit Kumar', completedClaims: 22, supervisorId: 'Li' },
  { id: 4, name: 'Pawan Chawla', completedClaims: 23, supervisorId: 'Be' },
  { id: 5, name: 'Deepa Gupta', completedClaims: 53, supervisorId: 'B' },
  { id: 6, name: 'Milano', completedClaims: 22, supervisorId: 'C' },
  { id: 7, name: 'Nico', completedClaims: 43, supervisorId: 'N' },
  { id: 8, name: 'Arse', completedClaims: 15, supervisorId: 'O' },
  { id: 9, name: 'Aurbrey', completedClaims: 18, supervisorId: 'F' },
  { id: 10, name: 'Roe', completedClaims: 20, supervisorId: 'Ne' },
  { id: 11, name: 'Joe', completedClaims: 22, supervisorId: 'Na' },
  { id: 12, name: 'John', completedClaims: 24, supervisorId: 'Mg' },
  { id: 13, name: 'David', completedClaims: 26, supervisorId: 'Al' },
  { id: 14, name: 'Silky', completedClaims: 28, supervisorId: 'Si' },
  { id: 15, name: 'Devendra', completedClaims: 30, supervisorId: 'P' },
  { id: 16, name: 'Akshay Saini', completedClaims: 32, supervisorId: 'S' },
  { id: 17, name: 'Pratibha', completedClaims: 35, supervisorId: 'Cl' },
  { id: 18, name: 'Katrina', completedClaims: 39, supervisorId: 'Ar' },
  { id: 19, name: 'Akshaya', completedClaims: 39, supervisorId: 'K' },
  { id: 20, name: 'Shreya', completedClaims: 40, supervisorId: 'Ca' },
];
